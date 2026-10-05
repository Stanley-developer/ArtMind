// Opens artmind.db and runs queries - Owner: STANLEY

const { DatabaseSync } = require('node:sqlite')
const config = require('../config')

const db = new DatabaseSync(config.dbPath)

db.exec('PRAGMA foreign_keys = ON;')

function all(sql, params = []) {
  const statement = db.prepare(sql)
  return statement.all(...params)
}

function one(sql, params = []) {
  const statement = db.prepare(sql)
  return statement.get(...params)
}

function run(sql, params = []) {
  const statement = db.prepare(sql)
  return statement.run(...params)
}

module.exports = { db, all, one, run }
