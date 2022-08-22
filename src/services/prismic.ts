import * as prismic from '@prismicio/client'
import { PrismicError } from '@prismicio/client'
import { asHTML } from '@prismicio/helpers'

import sm from '../../sm.json'

export const createPrismicClient = (config = {}) => {
  const client = prismic.createClient(sm.apiEndpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  })

  return client
}

export const getPrismicPost = async (slug: string, isPreview = true) => {
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
    const postContent = isPreview
      ? response.data.content.splice(0, 3)
      : response.data.content
    post = {
      slug,
      title: response.data.title,
      content: asHTML(postContent) ?? '',
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
    console.error(error instanceof PrismicError)
    console.error(error)
  }

  return post
}
