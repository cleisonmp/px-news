import { NextApiRequest, NextApiResponse } from 'next'

const users = (request: NextApiRequest, response: NextApiResponse) => {
  const users = [
    { id: 1, name: 'Jhon' },
    { id: 2, name: 'Maris' },
    { id: 3, name: 'Doe' },
  ]

  return response.json(users)
}
export default users
