import NextAuth, { type NextAuthConfig, type DefaultSession } from "next-auth"
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from "./mongodb-client"
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

// custom email provider type
type EmailProviderType = {
  id: string
  type: "email"
  name: string
  from: string
  sendVerificationRequest: (params: { identifier: string; url: string }) => Promise<void>
}

const ResendEmailProvider = (options: Omit<EmailProviderType, "type">): EmailProviderType => ({
  id: "resend",
  type: "email",
  name: "Resend",
  ...options,
})

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(client),
  providers: [
    ResendEmailProvider({
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
    }),
  ],
  pages: {
    error: "/login",
    verifyRequest: "/verify-email",
    signIn: "/login",
  },
} satisfies NextAuthConfig)
