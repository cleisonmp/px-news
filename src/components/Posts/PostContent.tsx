import Head from 'next/head'
import Link from 'next/link'

interface PostContentProps {
  post: {
    slug: string
    title: string
    content: string
    updatedAt: string
  }
  isPreview: boolean
}

export const PostContent = ({ post, isPreview }: PostContentProps) => {
  const { title, content, updatedAt } = post
  return (
    <>
      <Head>
        <title>{`${title} | PxNews`}</title>
      </Head>
      <main className="flex max-w-3xl mt-20 mx-auto w-full px-8 min-w-[320px]">
        <article className="mb-20">
          <h1 className="text-6xl font-black">{title}</h1>
          <time className="block text-gray-500 mt-6">{updatedAt}</time>
          <div
            className={`flex flex-col mt-8 gap-4 [&_a]:underline [&_ul]:list-disc [&_ol]:list-decimal [&_pre]:bg-gray-800 [&_h1]:text-4xl [&_h2]:text-3xl [&_h3]:text-2xl [&_h4]:text-xl ${
              isPreview
                ? 'bg-gradient-to-b from-gray-100 to-transparent bg-clip-text fill-color text-transparent'
                : ''
            }`}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {isPreview && (
            <Link href="/">
              <div className="group bg-gray-800 text-center rounded-full p-7 text-xl font-bold cursor-pointer hover:brightness-110 transition-all">
                Wanna continue reading?
                <a className="text-yellow-500 ml-1 group-hover:underline">
                  Subscribe now 🤗
                </a>
              </div>
            </Link>
          )}
        </article>
      </main>
    </>
  )
}
