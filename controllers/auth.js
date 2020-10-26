import bcrypt from 'bcrypt'
import { getDbInstance } from 'lib/db'
import { ResponseError } from 'lib/response-error'
import randomString from 'crypto-random-string'

const AuthController = {
  async login ({ req, res }) {
    let trx
    try {
      const payload = req.body
      const db = getDbInstance()

      if (!payload.email) {
        return res.status(400).send(ResponseError({ err: 'Email Required' }))
      }

      if (!payload.password) {
        return res
          .status(400)
          .send(ResponseError({ err: 'Password Required' }))
      }

      const userDetails = await db('users')
        .where({
          email: payload.email,
          is_active: true
        })
        .select('users.id', 'users.email', 'users.password')

      const isValidPassword = bcrypt.compare(
        payload.password,
        userDetails.password
      )

      if (!isValidPassword) {
        return res
          .status(400)
          .send(ResponseError({ err: 'Invalid Email/Password' }))
      }

      const accessToken = this._generateToken()

      const addToTokens = await trx('access_tokens')
        .insert({
          user_id: userDetails.id,
          token: accessToken,
          is_verified: true
        })
        .returning(['token'])

      return res.send({
        data: {
          token: addToTokens[0].token
        }
      })
    } catch (err) {
      console.error(err)

      if (trx) {
        await trx.rollback()
      }

      return res
        .status(500)
        .send({ message: 'Oops! Something went wrong', error: err })
    }
  },

  register ({ req, res }) {},

  resetPassword ({ req, res }) {},

  forgotPassword ({ req, res }) {},

  _generateToken () {
    return randomString({ length: 10, type: 'alphanumeric' })
  }
}

export default AuthController
