import { randomBytes } from 'crypto'

const getExpirationDate = () => {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return date.toISOString()
}

export default [
  {
    id: 1,
    name: 'Test API Key',
    key: 'dp-' + randomBytes(16).toString('hex'),
    expiresAt: getExpirationDate(),
    userId: 1,
  },
]
