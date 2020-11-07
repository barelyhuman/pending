import AuthController from 'controllers/auth'

export default async (req, res) => {
  if (req.method === 'GET') {
    return AuthController.logout({ req, res })
  }
  return res.status(404).end()
}
