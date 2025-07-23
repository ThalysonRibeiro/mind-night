// /* eslint-disable @typescript-eslint/no-unused-vars */
// import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

// declare module 'next-auth' {
//   interface Session {
//     user: {
//       id: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//       phone?: string | null;
//       role?: 'USER' | 'ADMIN';
//       settings?: UserSettings; // 👈 adicionado
//     } & DefaultSession['user'];
//   }

//   interface User extends DefaultUser {
//     phone?: string | null;
//     role?: 'USER' | 'ADMIN';
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     id?: string;
//     name?: string | null;
//     email?: string | null;
//     phone?: string | null;
//     image?: string | null;
//     role?: 'USER' | 'ADMIN';
//     settings?: UserSettings; // 👈 adicionado
//   }
// }