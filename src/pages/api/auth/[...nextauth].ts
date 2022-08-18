import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { query } from 'faunadb'
import { fauna } from '../../../services/fauna'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: { params: { scope: 'read:user' } },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user }) {
      const { email } = user
      // console.log(user)
      // console.log(account)
      // console.log(profile)
      console.log(email)
      // console.log(credentials)

      try {
        await fauna.query(
          query.Create(query.Collection('users'), { data: { email } }),
        )
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },
  },
})
