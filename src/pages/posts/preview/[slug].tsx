import { useEffect } from 'react'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import router from 'next/router'
import { useSession } from 'next-auth/react'
import { getPrismicPost } from '../../../services/prismic'
import { PostContent } from '../../../components/Posts/PostContent'

interface PreviewProps {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}
const Preview: NextPage<PreviewProps> = ({ post }: PreviewProps) => {
  const { slug } = post
  const { data: session } = useSession()

  useEffect(() => {
    if (session?.userActiveSubscription) {
      router.push(`/posts/${slug}`)
    }
  }, [session, slug])

  return <PostContent post={post} isPreview />
}
export default Preview

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = String(params?.slug) ?? ''

  const post = await getPrismicPost(slug, true)

  return {
    props: { post },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
