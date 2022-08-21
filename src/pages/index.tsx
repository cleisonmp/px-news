import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { SubscribeButton } from '../components/Home/SubscribeButton'
import { stripe } from '../services/stripe'

interface HomeProps {
  product: {
    priceID: string
    amount: number
  }
}

const Home: NextPage<HomeProps> = ({ product }) => {
  return (
    <>
      <Head>
        <title>PX.News</title>
      </Head>
      <main className="flex items-center max-w-6xl mx-auto px-8 min-w-[320px] gap-40 grow w-full">
        <section>
          <span className="text-2xl font-bold">👏 Hey, welcome</span>
          <h1 className="text-7xl font-black mt-10">
            News about <br />
            the <span className="text-cyan-400">React</span> world
          </h1>
          <p className="mt-6 text-2xl font-bold mb-10">
            Get access to all the publications
            <br />
            <span className="text-cyan-400">for {product.amount} a month</span>
          </p>
          <SubscribeButton priceId={product.priceID} />
        </section>
        <Image
          src="/images/avatar.svg"
          width={336}
          height={521}
          alt="Girl coding"
        />
      </main>
    </>
  )
}

export default Home

// getServerSideProps
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1LXwiVIxflAC4rCq5NEft7cJ')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount! / 100),
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
