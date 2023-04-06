const {user:table} = require('../sql/tables')
const database = require('../db/database')

const User = {
  get:  async ({limit=10,offset=0})=>{
    const sqliteCode = `SELECT * FROM notes ORDER BY id LIMIT ${limit} OFFSET ${offset}`
    return await database.get({table,sqliteCode})
  },
  post:  async ({name='',email='',password=''})=>{
  const insert = `INSERT INTO user (name, email, password)
  VALUES ('${name}', '${email}', '${password}')`
    return await database.post({table,insert,tableName:'user'})
  },
  getById: async ({id=''})=>{
    const sqliteCode = `SELECT * FROM user WHERE id = '${id}'`
    return await database.get({table:table,sqliteCode:sqliteCode});
  },
  getByEmail: async ({email=''})=>{
    const sqliteCode = `SELECT * FROM user WHERE email = '${email}'`
    return await database.get({table:table,sqliteCode:sqliteCode});
  }
}

module.exports = User