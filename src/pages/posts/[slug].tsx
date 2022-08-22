import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'
import { getPrismicPost } from '../../services/prismic'
import { PostContent } from '../../components/Posts/PostContent'

interface PostProps {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
}
const Post: NextPage<PostProps> = ({ post }: PostProps) => {
  return <PostContent post={post} isPreview={false} />
}
export default Post

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context)
  const slug = String(context.params?.slug) ?? ''

  if (!session?.userActiveSubscription) {
    return {
      redirect: {
        destination: `/posts/preview/${slug}`,
        permanent: false,
      },
    }
  }
  const post = await getPrismicPost(slug, false)

  return {
    props: { post },
  }
}
