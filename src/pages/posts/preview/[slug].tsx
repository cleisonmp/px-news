import Head from 'next/head'
import { createPrismicClient } from '../../../services/prismic'
import { asHTML } from '@prismicio/helpers'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import router from 'next/router'

interface PreviewProps {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}
const Preview: NextPage<PreviewProps> = ({ post }: PreviewProps) => {
  const { slug, title, content, updatedAt } = post
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.userActiveSubscription) {
      router.push(`/posts/${slug}`)
    }
  }, [session, slug])

  return (
    <>
      <Head>
        <title>{`${title} | PxNews`}</title>
      </Head>
      <main className="flex max-w-3xl mt-20 mx-auto w-full px-8 min-w-[320px]">
        <article>
          <h1 className="text-6xl font-black">{title}</h1>
          <time className="block text-gray-500 mt-6">{updatedAt}</time>
          <div
            className="flex flex-col mt-8 gap-4 [&_a]:underline [&_ul]:list-disc [&_ol]:list-decimal [&_pre]:bg-gray-800 [&_h1]:text-4xl [&_h2]:text-3xl [&_h3]:text-2xl [&_h4]:text-xl bg-gradient-to-b from-gray-100 to-transparent bg-clip-text fill-color text-transparent"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <Link href="/">
            <div className="group bg-gray-800 text-center rounded-full p-7 text-xl font-bold cursor-pointer hover:brightness-110 transition-all">
              Wanna continue reading?
              <a className="text-yellow-500 ml-1 group-hover:underline">
                Subscribe now 🤗
              </a>
            </div>
          </Link>
        </article>
      </main>
    </>
  )
}
export default Preview

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug ?? ''
  console.log(slug)

  const prismic = createPrismicClient()
  let post = {
    slug,
    title: '',
    content: '',
    updatedAt: '',
  }

  // Unknown UID, yields PrismicError
  try {
    const response = await prismic.getByUID('post', String(slug))

    post = {
      slug,
      title: response.data.title,
      content: asHTML(response.data.content.splice(0, 3)) ?? '',
      updatedAt: new Date(response.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        },
      ),
    }
  } catch (error) {
    // console.error(error instanceof PrismicError)
    // console.error(error)
    console.log('prismic error')
  }
  return {
    props: { post },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
