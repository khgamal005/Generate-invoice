import NextAuth, { DefaultSession } from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "./mongodb-client"
import EmailProvider from "next-auth/providers/email"
import { Resend } from "resend"

const resend = new Resend(process.env.AUTH_RESEND_KEY!)

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

EmailProvider({
  from: "Generate-Invoice <info@resend.amitprajapati.co.in>",
  sendVerificationRequest: async ({ identifier, url }) => {
    await resend.emails.send({
      from: "Generate-Invoice <info@resend.amitprajapati.co.in>",
      to: identifier,
      subject: "Sign in to Generate-Invoice",
      html: `<p>Click <a href="${url}">here</a> to sign in.</p>`,
      text: `Sign in link: ${url}`,
    })
  },
})
  pages: {
    error: "/login",
    verifyRequest: "/verify-email",
    signIn: "/login",
  },
})
