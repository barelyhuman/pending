import knex from 'knex'
import knexfile from '../knexfile'

let dbInstance

export function getDbInstance () {
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
