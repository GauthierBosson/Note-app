import type { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { getServerSession } from 'next-auth'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id
      }

      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }

      return token
    },
  },
}

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions)

  if (!session) {
    return undefined
  }

  return session.user
}
