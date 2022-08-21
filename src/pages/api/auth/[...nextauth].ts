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
    async session({ session, token, user }) {
      try {
        const userActiveSubscription = await fauna.query(
          query.Get(
            query.Intersection([
              query.Match(
                query.Index('subscription_by_user_ref'),
                query.Select(
                  'ref',
                  query.Get(
                    query.Match(
                      query.Index('user_by_email'),
                      query.Casefold(session.user?.email ?? ''),
                    ),
                  ),
                ),
              ),
              query.Match(query.Index('subscription_by_status'), 'active'),
            ]),
          ),
        )

        return { ...session, userActiveSubscription }
      } catch {
        return { ...session, userActiveSubscription: null }
      }
    },
    async signIn({ user }) {
      const { email } = user
      // console.log(user)
      // console.log(account)
      // console.log(profile)
      // console.log(email)
      // console.log(credentials)

      try {
        await fauna.query(
          query.If(
            query.Not(
              query.Exists(
                query.Match(
                  query.Index('user_by_email'),
                  query.Casefold(user.email!),
                ),
              ),
            ),
            query.Create(query.Collection('users'), { data: { email } }),
            query.Get(
              query.Match(
                query.Index('user_by_email'),
                query.Casefold(user.email!),
              ),
            ),
          ),
        )
        return true
      } catch (error) {
        console.error(error)
        return false
      }
    },
  },
})
