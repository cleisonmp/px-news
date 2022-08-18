interface SubscribeButtonProps {
  priceId: string
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  console.log(priceId)

  return (
    <button
      type="button"
      className="bg-yellow-600 rounded-full py-5 px-16 text-gray-900 font-bold text-xl hover:brightness-75 transition-all"
    >
      Subscribe now
    </button>
  )
}
