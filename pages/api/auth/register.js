import AuthController from 'controllers/auth'

export default async (req, res) => {
  if (req.method === 'POST') {
    return AuthController.register({ req, res })
  }
  return res.status(404).end()
}
