import * as prismic from '@prismicio/client'
import * as prismicH from '@prismicio/helpers'

import sm from '../../sm.json'

export const convertPrismicContentToText = (value: any) => {
  return prismicH.asText(value)
}
export const createPrismicClient = (config = {}) => {
  const client = prismic.createClient(sm.apiEndpoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  })

  return client
}
