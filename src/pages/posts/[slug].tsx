import Head from 'next/head'
import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { createPrismicClient } from '../../services/prismic'
import { asHTML } from '@prismicio/helpers'

interface PostProps {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}
const Post: NextPage<PostProps> = ({ post }: PostProps) => {
  const { slug, title, content, updatedAt } = post
  console.log(slug)

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
            className="flex flex-col mt-8 gap-4 [&_a]:underline [&_ul]:list-disc [&_ol]:list-decimal [&_pre]:bg-gray-800 [&_h1]:text-4xl [&_h2]:text-3xl [&_h3]:text-2xl [&_h4]:text-xl"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </article>
      </main>
    </>
  )
}
export default Post

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)

  if (!session?.userActiveSubscription) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const slug = context.params?.slug ?? ''
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
      content: asHTML(response.data.content) ?? '',
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
  }
}
