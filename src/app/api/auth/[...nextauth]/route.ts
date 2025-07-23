import api from "@/lib/axios"
import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      interface GoogleProfile {
        email_verified?: boolean;
      }

      if (account?.provider === 'google') {
        const res = await api.post(`${process.env.NEXT_PUBLIC_API_BACKEND_URL}/auth/nextjs/signin`, {
          email: user.email,
          name: user.name,
          image: user.image,
          googleId: user.id,
          verified: (profile as GoogleProfile).email_verified,
        })

        if (res.status === 200) {
          return true
        } else {
          console.error('Backend signin failed:', await res.data)
          return false
        }
      }
      return true
    },
  },
  // pages: {
  //   signIn: '/login',
  // },
})

export { handler as GET, handler as POST }