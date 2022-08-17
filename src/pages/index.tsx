import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { SubscribeButton } from '../components/Home/SubscribeButton'

const Home: NextPage = () => {
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
            <span className="text-cyan-400">for $9.90 month</span>
          </p>
          <SubscribeButton />
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
