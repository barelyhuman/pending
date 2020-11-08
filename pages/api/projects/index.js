import ProjectController from 'controllers/project'
import UserController from 'controllers/user'
import { withContext } from 'lib/context'

const handler = async (req, res) => {
  if (req.method === 'GET') {
    return ProjectController.fetchAll({ req, res })
  }
  if (req.method === 'POST') {
    return ProjectController.addProject({ req, res })
  }

  return res.status(404).end()
}

export default withContext(handler, { auth: true })