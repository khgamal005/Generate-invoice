import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth, { DefaultSession } from "next-auth"
import client from "./mongodb-client"
import Email from "next-auth/providers/email"

// 🔹 Extend session types
declare module "next-auth" {
  interface Session {
    user: {
      firstName: string
      lastName: string
      currency: string
    } & DefaultSession["user"]
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),

  providers: [
    Email({
      server: {
        host: "smtp.gmail.com",
        port: 587, // use 465 if you want `secure: true`
        secure: false,
        auth: {
          user: process.env.EMAIL_USER, // your Gmail
          pass: process.env.EMAIL_PASS, // Gmail App Password
        },
      },
      from: process.env.EMAIL_FROM || "Acme <khgamal005@gmail.com>",
    }),
  ],

  pages: {
    error: "/login",
    verifyRequest: "/verify-email",
    signIn: "/login",
  },
})
