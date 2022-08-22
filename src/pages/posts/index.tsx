import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { createPrismicClient } from '../../services/prismic'

type Post = {
  slug: string
  title: string
  excerpt: string
  updatedAt: string
}
interface PostsProps {
  posts: Post[]
}
const Posts: NextPage<PostsProps> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>PX.News - Posts</title>
      </Head>
      <main className="flex max-w-3xl mt-20 mx-auto w-full px-8 min-w-[320px]">
        <div className="flex flex-col mb-20">
          {posts.map((post, index) => (
            <Link href={`posts/${post.slug}`} key={index}>
              <a className="group flex flex-col first:mt-0 mt-8 border-b border-gray-600 last:border-0">
                <time className="text-gray-500">{post.updatedAt}</time>
                <strong className="mt-4 group-hover:text-yellow-500 text-2xl font-bold">
                  {post.title}
                </strong>
                <p className="mt-1 mb-8 text-gray-500">{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}

export default Posts

export const getStaticProps: GetStaticProps = async () => {
  const prismic = createPrismicClient()

  const response = await prismic.getAllByType('post', {
    orderings: [
      { field: 'document.first_publication_date', direction: 'desc' },
    ],
  })
  const posts = response.map((post) => {
    return {
      slug: post.uid,
      title: post.data.title,
      excerpt:
        post.data.content
          .find((content: any) => content.type === 'paragraph')
          ?.text.substring(0, 175) + '...' ?? '',
      updatedAt: new Date(post.last_publication_date).toLocaleDateString(
        'pt-BR',
        {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        },
      ),
    }
  })

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
