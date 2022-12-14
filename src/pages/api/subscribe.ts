import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { query } from 'faunadb'
import { fauna } from '../../services/fauna'
import { stripe } from '../../services/stripe'

type User = {
  ref: { id: string }
  data: { stripe_customer_id: string }
}
const subscribe = async (
  request: NextApiRequest,
  response: NextApiResponse,
) => {
  if (request.method === 'POST') {
    const session = await getSession({ req: request })
    const userEmail = session?.user?.email ? session.user.email : ''

    const user = await fauna.query<User>(
      query.Get(
        query.Match(query.Index('user_by_email'), query.Casefold(userEmail)),
      ),
    )

    let stripeCustomerId = user.data.stripe_customer_id

    if (!stripeCustomerId) {
      const stripeCustomer = await stripe.customers.create({
        email: userEmail,
      })

      await fauna.query(
        query.Update(query.Ref(query.Collection('users'), user.ref.id), {
          data: { stripe_customer_id: stripeCustomer.id },
        }),
      )
      stripeCustomerId = stripeCustomer.id
    }

    const stripeCheckoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [
        {
          price: 'price_1LXwiVIxflAC4rCq5NEft7cJ',
          quantity: 1,
        },
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL!,
      cancel_url: process.env.STRIPE_CANCEL_URL!,
    })
    response.status(200).json({ sessionId: stripeCheckoutSession.id })
  } else {
    response.setHeader('Allow', 'POST')
    response.status(405).end('Method not allowed')
  }
}
export default subscribe
