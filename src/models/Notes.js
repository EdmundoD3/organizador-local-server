const Notes = {
  get: async ({limit=10,offset=0})=> {
    //SQLite code
  const {note:table} = require('../sql/tables')
  const sqliteCode = `SELECT * FROM notes ORDER BY id LIMIT ${limit} OFFSET ${offset}`
    //sqlite database
  const {get:databaseGet} = require("../db/database")
  return await databaseGet({table:table,sqliteCode:sqliteCode})
    },
  getById: async ({id=0})=> {
  //SQLite code
  const {note:table} = require('../sql/tables')
  const sqliteCode = `SELECT * FROM notes WHERE id = '${id}'`
  //sqlite database
  const {get:databaseGet} = require("../db/database")
  return await databaseGet({table:table,sqliteCode:sqliteCode});
  },
  getByTitle: async ({title=''})=> {
    //SQLite code
    const sqlWhere = `$title LIKE '${title}%'`
    const {note:table} = require('../sql/tables')
    const sqliteCode = `SELECT * FROM notes WHERE ${sqlWhere}`
    //sqlite database
    const {get:databaseGet} = require("../db/database")
    return await databaseGet({table:table,sqliteCode:sqliteCode});
  },
  post:async ({title, content})=> {
    //SQLite code
    const {note:table} = require('../sql/tables')
    const insert = `INSERT INTO notes (title, content) VALUES ('${title}', '${content}')`
    //sqlite database
    const {post:databasePost} = require("../db/database")
    return await databasePost({table:table,insert:insert,tableName:'notes'});
  },
  put:async ({id, title, content})=> {
    //SQLite code
  const {note:table} = require('../sql/tables')
  const update = updateSqlData({id,title,content})

  const sqliteCode = `SELECT * FROM notes WHERE id = ${id}`
  //sqlite database
  const {put:databasePut} = require("../db/database")
  return await databasePut({table:table,update:update,sqliteCode:sqliteCode});
  },
  deleteById:async ({id})=> {
  //SQLite code
  const {note:table} = require('../sql/tables')
  const sqliteDelete = `DELETE FROM notes WHERE id = ${id}`
  //sqlite database
  const {delete:databaseDelete} = require("../db/database")
  return await databaseDelete({table:table,sqliteDelete:sqliteDelete});
  },
}
module.exports = Notes

const updateSqlData=({id,title,content}) =>{
  const updateTitle = !title? "":`title = '${title}'${!content?"":","}`
  const updateContent = !content?"":`content = '${content}'`
  const update = `UPDATE notes SET ${updateTitle} ${updateContent} WHERE id = ${id}`
return update
}