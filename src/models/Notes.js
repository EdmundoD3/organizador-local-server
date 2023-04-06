const {note:table} = require('../sql/tables')
//sqlite database
const database = require("../db/database")

const Notes = {
  get: async ({limit=10,offset=0})=> {
    //SQLite code
  const sqliteCode = `SELECT * FROM notes ORDER BY id LIMIT ${limit} OFFSET ${offset}`
  return await database.get({table:table,sqliteCode:sqliteCode})
    },
  getById: async ({id=0})=> {
  //SQLite code
  const sqliteCode = `SELECT * FROM notes WHERE id = '${id}'`
  return await database.get({table:table,sqliteCode:sqliteCode});
  },
  getByTitle: async ({title=''})=> {
    //SQLite code
    const sqliteCode = `SELECT * FROM notes WHERE title LIKE '${title}%'`
    return await database.get({table:table,sqliteCode:sqliteCode});
  },
  post:async ({title, content})=> {
    //SQLite code
    const insert = `INSERT INTO notes (title, content) VALUES ('${title}', '${content}')`
    return await database.post({table:table,insert:insert,tableName:'notes'});
  },
  put:async ({id, title, content})=> {
    //SQLite code
  const update = updateSqlData({id,title,content})
  const sqliteCode = `SELECT * FROM notes WHERE id = ${id}`
  return await database.put({table:table,update:update,sqliteCode:sqliteCode});
  },
  deleteById:async ({id})=> {
  //SQLite code
  const sqliteDelete = `DELETE FROM notes WHERE id = ${id}`
  return await database.delete({table:table,sqliteDelete:sqliteDelete});
  },
}
module.exports = Notes

const updateSqlData=({id,title,content}) =>{
  const updateTitle = !title? "":`title = '${title}'${!content?"":","}`
  const updateContent = !content?"":`content = '${content}'`
  const update = `UPDATE notes SET ${updateTitle} ${updateContent} WHERE id = ${id}`
  return update
}