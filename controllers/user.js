const { getDbInstance } = require('lib/db')
const { ResponseError } = require('lib/response-error')

const UserController = {
  async fetchMe ({ req, res }) {
    const { currentUser } = req
    const db = getDbInstance()

    const user = await db('users')
      .where({
        is_active: true,
        id: currentUser.id
      })
      .select('id', 'email')

    if (!user) {
      return res.status(400).send(ResponseError({ err: 'Invalid Request' }))
    }

    return res.send({
      id: user[0].id,
      email: user[0].email
    })
  }
}

export default UserController
