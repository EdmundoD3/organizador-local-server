const User = {
  get:  async ({limit=10,offset=0})=>{
    const sqliteCode = `SELECT * FROM notes ORDER BY id LIMIT ${limit} OFFSET ${offset}`
    const {get:databaseGet} = require('../db/database')
    const {user:table} = require('../sql/tables')
    return await databaseGet({table,sqliteCode})
  },
  post:  async ({name='',email='',password=''})=>{
  const insert = `INSERT INTO user (name, email, password)
  VALUES ('${name}', 
  '${email}', 
  '${password}')`
    const {post:databasePost} = require('../db/database')
    const {user:table} = require('../sql/tables')
    return await databasePost({table,insert,tableName:'user'})
  },
  getById: async ({id=''})=>{
    const {get:databaseGet} = require('../db/database')
    const sqliteCode = `SELECT * FROM user WHERE id = '${id}'`
    const {user:table} = require('../sql/tables')

    return await databaseGet({table:table,sqliteCode:sqliteCode});
  },
  getByEmail: async ({email=''})=>{
    const {get:databaseGet} = require('../db/database')
    const sqliteCode = `SELECT * FROM user WHERE email = '${email}'`
    const {user:table} = require('../sql/tables')

    return await databaseGet({table:table,sqliteCode:sqliteCode});
  }
}

module.exports = User