import { signIn, useSession } from 'next-auth/react'
import { api } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'

interface SubscribeButtonProps {
  priceId: string
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  console.log('priceId ' + priceId)
  const { data: session } = useSession()

  const handleSubscribe = async () => {
    if (!session) {
      signIn('github')
      return
    }
    try {
      const response = await api.post('/subscribe')
      const { sessionId } = response.data
      const stripe = await getStripeJs()

      await stripe?.redirectToCheckout({ sessionId })
    } catch (error: any) {
      console.error(error)
      alert(error.message)
    }
  }

  return (
    <button
      type="button"
      onClick={handleSubscribe}
      className="bg-yellow-600 rounded-full py-5 px-16 text-gray-900 font-bold text-xl hover:brightness-75 transition-all"
    >
      Subscribe now
    </button>
  )
}
