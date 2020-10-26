import bcrypt from 'bcrypt'
import { getDbInstance } from 'lib/db'
import { ResponseError } from 'lib/response-error'
import randomString from 'crypto-random-string'
import { serialize } from 'cookie'

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
          email: this._normalizeEmail(payload.email),
          is_active: true
        })
        .select('users.id', 'users.email', 'users.password')

      if (!userDetails || !userDetails.length) {
        return res.status(400).send(
          ResponseError({
            err: "Couldn't find any User with the specified email"
          })
        )
      }

      const isValidPassword = bcrypt.compare(
        payload.password,
        userDetails[0].password
      )

      if (!isValidPassword) {
        return res
          .status(400)
          .send(ResponseError({ err: 'Invalid Email/Password' }))
      }

      const accessToken = this._generateToken()

      trx = await db.transaction()

      const addToTokens = await trx('access_tokens')
        .insert({
          user_id: userDetails[0].id,
          token: accessToken,
          is_verified: true
        })
        .returning(['token'])

      await trx.commit()

      res.setHeader(
        'Set-Cookie',
        serialize('auth', addToTokens[0].token, {
          expires: new Date(
            new Date().setFullYear(new Date().getFullYear() + 1)
          ),
          httpOnly: true,
          path: '/',
          sameSite: 'lax'
        })
      )

      return res.send({
        data: {
          success: true
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
  },

  async register ({ req, res }) {
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

      if (!payload.confirmPassword) {
        return res
          .status(400)
          .send(ResponseError({ err: 'Please enter a password confirmation' }))
      }

      const userDetails = await db('users')
        .where({
          email: this._normalizeEmail(payload.email),
          is_active: true
        })
        .select('users.email')

      if (userDetails && userDetails.length) {
        return res
          .status(400)
          .send(ResponseError({ err: 'User with this email already exists' }))
      }

      trx = await db.transaction()

      const addedUser = await trx('users')
        .insert({
          email: this._normalizeEmail(payload.email),
          password: await this._hashPassword(payload.password)
        })
        .returning(['id'])

      await trx.commit()

      return res.send({
        id: addedUser[0].id
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
  },

  resetPassword ({ req, res }) {},

  forgotPassword ({ req, res }) {},

  _generateToken () {
    return randomString({ length: 65, type: 'alphanumeric' })
  },
  _normalizeEmail (email) {
    return email.toLowerCase().trim()
  },
  async _hashPassword (textPassword) {
    const saltRounds = 15
    return bcrypt.hash(textPassword, saltRounds)
  }
}

export default AuthController
