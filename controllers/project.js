import { getDbInstance } from 'lib/db'
import { ResponseError } from 'lib/response-error'
import { schemaToObject } from 'lib/schema-to-object'
import AddProject from 'pages/projects/add'

const ProjectController = {
  async fetchAll ({ req, res }) {
    try {
      const { currentUser } = req
      const db = getDbInstance()

      let projectsList = await db('project_user_mapping')
        .where({
          'project_user_mapping.user_id': currentUser.id
        })
        .leftJoin('projects', 'project_user_mapping.project_id', 'projects.id')
        .select(
          'projects.id as project__id',
          'projects.name as project__name',
          'projects.description as project__description'
        )

      projectsList = projectsList.map(schemaToObject)

      return res.send({
        data: projectsList
      })
    } catch (err) {
      console.error(err)

      return res
        .status(500)
        .send(
          ResponseError({ message: 'Oops! Something went wrong', err: err })
        )
    }
  },
  async fetchById ({ req, res }) {
    try {
      const payload = req.query
      const { currentUser } = req
      const db = getDbInstance()

      let projectDetails = await db('project_user_mapping')
        .where({
          'project_user_mapping.user_id': currentUser.id,
          'project_user_mapping.project_id': payload.id
        })
        .leftJoin('projects', 'project_user_mapping.project_id', 'projects.id')
        .select(
          'projects.id as project__id',
          'projects.name as project__name',
          'projects.description as project__description'
        )

      projectDetails = schemaToObject(projectDetails[0])

      return res.send({
        data: projectDetails
      })
    } catch (err) {
      console.error(err)

      return res
        .status(500)
        .send(
          ResponseError({ message: 'Oops! Someting went wrong', err: err })
        )
    }
  },

  async addProject ({ req, res }) {
    let trx
    try {
      const { currentUser } = req
      const payload = req.body
      const db = getDbInstance()

      trx = await db.transaction()

      const dbPayload = {
        name: payload.name,
        description: payload.description,
        time_spent: 0,
        team_id: payload.team_id,
        user_id: currentUser.id
      }

      const createdProject = await trx('projects')
        .insert(dbPayload)
        .returning(['id'])

      const mappingAddition = await trx('project_user_mapping')
        .insert({
          user_id: currentUser.id,
          role: 'owner',
          project_id: createdProject[0].id
        })
        .returning(['id'])

      await trx.commit()

      return res.send({
        data: {
          id: createdProject[0].id
        }
      })
    } catch (err) {
      console.error(err)

      if (trx) {
        await trx.rollback()
      }

      return res
        .status(500)
        .send(
          ResponseError({ message: 'Oops! Something went wrong', err: err })
        )
    }
  }
}

export default ProjectController
