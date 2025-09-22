import { MongoDBAdapter } from "@auth/mongodb-adapter"
import NextAuth, { DefaultSession } from "next-auth"
import client from "./mongodb-client"
import Nodemailer from "next-auth/providers/nodemailer"

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
    Nodemailer({
      server: {
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Gmail requires SSL on port 465
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

  debug: true, // helpful while testing
})
