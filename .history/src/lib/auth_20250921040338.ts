import NextAuth from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "./mongodb-client"
import { Resend } from "resend"

const resend = new Resend(process.env.AUTH_RESEND_KEY!)

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),

  providers: [
    {
      id: "resend-email",
      type: "email",
      name: "Resend",
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
    },
  ],

  pages: {
    error: "/login",
    verifyRequest: "/verify-email",
    signIn: "/login",
  },
})
