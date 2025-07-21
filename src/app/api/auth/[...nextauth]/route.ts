import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import type { NextAuthOptions, User } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import prisma from '@/lib/prisma'
import { Adapter } from 'next-auth/adapters'
import { getEnv } from '@/lib/env';

const env = await getEnv();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.name = token.name || null;
        session.user.image = token.picture || null;
        session.user.email = token.email || null;
        session.user.phone = typeof token.phone === 'string' ? token.phone : null;
        session.user.role = token.role as 'USER' | 'ADMIN';
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.picture = user.image;
        token.email = user.email;
        token.phone = user.phone;
        token.role = (user as User).role;
      } else {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          select: { name: true, email: true, phone: true, image: true, role: true },
        });
        if (dbUser) {
          token.name = dbUser.name;
          token.picture = dbUser.image;
          token.email = dbUser.email;
          token.phone = dbUser.phone;
          token.role = dbUser.role;
        }
      }
      return token;
    }
  },
  session: {
    strategy: 'jwt',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }