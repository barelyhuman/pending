import { getDbInstance } from 'lib/db'
import { ResponseError } from './response-error'

export function withContext (handler, { auth = false }) {
  return async (req, res) => {
    const cookies = req.cookies
    const db = getDbInstance()

    if (auth) {
      if (!cookies.auth) {
        return res.status(401).send(ResponseError({ err: 'Unauthorized Access!' }))
      }

      const accessToken = await db('access_tokens')
        .where({
          'access_tokens.is_active': true,
          'access_tokens.token': cookies.auth
        })
        .leftJoin('users', 'users.id', 'access_tokens.user_id')
        .select('users.id as userId', 'users.email as email')

      if (!accessToken || !accessToken.length) {
        return res
          .status(401)
          .send(ResponseError({ err: 'Unauthorized Access!' }))
      }

      req.currentUser = { id: accessToken[0].userId }
    }

    return handler(req, res)
  }
}
