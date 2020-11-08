import knex from 'knex'
import knexfile from '../knexfile'

let dbInstance

export function getDbInstance () {
  console.log({ env: process.env.NODE_ENV, url: process.env.DB_URL })

  const env = process.env.NODE_ENV || 'development'
  const config = knexfile[env]

  if (!config) {
    throw new Error("Knex Config wasn't found")
  }

  if (!dbInstance) {
    dbInstance = knex(config)
  }

  return dbInstance
}
