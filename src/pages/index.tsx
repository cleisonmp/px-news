import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>PX.News</title>
      </Head>
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <h1 className="text-3xl">The App</h1>
      </div>
    </>
  )
}

export default Home
