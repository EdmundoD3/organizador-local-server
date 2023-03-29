const router = require('express').Router();
const sqlite3 = require('sqlite3').verbose();

// Use the absolute address of the database file
const path = `${__dirname}`.slice(0, -6)+'\db\\data.db';


router.get('/note/:id', async (req, res) => {
  const id = req.params.id
  if (!id) return  res.json({error:'id is not found'})
  //SQLite code
  const {note:table} = require('../sql/tables')
  const sqliteCode = `SELECT * FROM notes WHERE id = '${id}'`
  //sqlite database
  const note = await databaseGet({table:table,sqliteCode:sqliteCode,res:res});
  return res.json({data:note})
})

router.get('/note', async (req, res) => {
  const {id,title} = req.body
  if (!id&&!title) return  res.json({error:'id and title is not found'})
  if (!id) return  res.json({error:'id is not found'})
  if (typeof(id) !== 'number') return  res.json({error:'id is not a number'})
  //SQLite code
  const sqlWhereId = !id? false:`id = ${id}${!title?' ':' or'}`
  const sqlWhere = !title? sqlWhereId : `${sqlWhereId} title LIKE '${title}%'`
  const {note:table} = require('../sql/tables')
  const sqliteCode = `SELECT * FROM notes WHERE ${sqlWhere}`
  //sqlite database
  const note = await databaseGet({table:table,sqliteCode:sqliteCode,res:res});
  res.json({data:note})
})

router.get('/notes', async (req, res) => {
  const {limit,offset} = req.body
  if (typeof(limit) !== 'number') return  res.json({error:'limit is not a number'})
  if (typeof(offset) !== 'number') return  res.json({error:'offset is not a number'})
  //SQLite code
  const {note:table} = require('../sql/tables')
  const sqliteCode = `SELECT * FROM notes ORDER BY id LIMIT ${limit} OFFSET ${offset}`
  const data = await databaseGet({table:table,sqliteCode:sqliteCode})
  res.json({data})
})

// router.get('/notess', async (req, res) => {
//   let db =  new sqlite3.Database(path,sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
//     if (err) {
//       return console.error(err.message);
//     }
//   });
//   const ree = async ()=>{ 
//     return new Promise((resolve,reject)=>{
//     db.all("SELECT * FROM notes",[],(err,rows)=>{
//             if(err)reject(err)
//               resolve(rows)
//     })
//     })}
//     const reee=await ree()
//     console.log(reee)
//   const ress = await new Promise((resolve,reject)=>{
//     db.all("SELECT * FROM notes",[],(err,rows)=>{
//             if(err)reject(err)
//               resolve(rows)
//     })
//     })
//     res.json(ress)
//     db.close();
// })



router.post('/note', async (req, res) => {
  const {title, content} = req.body
  if (!title || !content) return res.json({error: `faltan datos titulo o contenido`})
  //SQLite code
  const {note:table} = require('../sql/tables')
  const insert = `INSERT INTO notes (title, content)
  VALUES ('${title}', 
  '${content}')`
  //sqlite database
  try {
    const data = await databasePost({table:table,insert:insert});
  res.json({data})
  } catch (error) {
    res.json({error:error})
  }
  
})

router.put('/note', async (req, res) => {
  const {id, title, content} = req.body
  if (!id) return res.json({error:'id is not found'})
  if (!title && !content) return res.json({error: `faltan datos titulo o contenido`})
  //SQLite code
  const {note:table} = require('../sql/tables')
  const updateTitle = !title? "":`title = '${title}'${!content?"":","}`
  const updateContent = !content?"":`content = '${content}'`
  const update = `UPDATE OR IGNORE notes SET ${updateTitle} ${updateContent} WHERE id = ${id}`
  console.log(update)
  const sqliteCode = `SELECT * FROM notes WHERE id = ${id}`
  //sqlite database
  const data = await databasePut({table:table,update:update,sqliteCode:sqliteCode});
  res.json({data})
})

router.delete('/note', async (req, res) => {
  const {id,title} = req.body
  if (!id&&!title) return  res.json({error:'id and title is not found'})
  if (!id) return  res.json({error:'id is not found'})
  if (typeof(id) !== 'number') return  res.json({error:'id is not a number'})
  //SQLite code
  const {note:table} = require('../sql/tables')
  const sqliteDelete = `DELETE FROM notes WHERE id = ${id}`
  //sqlite database
  const note = await databaseDelete({table:table,sqliteDelete:sqliteDelete});
  res.json({data:note})
})
module.exports = router;


  //database insert and return the data as confirmation
async function databaseGet({table,sqliteCode}) {
  return new Promise((resolve,reject)=>{
    let db =  openDatabase(reject)
    db.run(table)
    db.all(sqliteCode,[],(err,rows)=>{
      if(err)reject(err)
        resolve(rows)
      })
    db.close();
})}

async function databasePost({table,insert}) {
  return new Promise((resolve,reject)=>{
    let db =  openDatabase(reject)
    try {
      db.run(table)
      db.all(insert)
      db.all('SELECT MAX(id) FROM notes', [],(err,rows)=>{
        if(err)reject(err)
          resolve([{id:rows[0]["MAX(id)"]}])
        })
    } catch (error) {
      reject(error)
    }
    
    db.close();
})}

async function databasePut({table,update,sqliteCode}) {
  return new Promise((resolve,reject)=>{
    let db =  openDatabase(reject)
    try {
      db.run(table)
      db.all(update)
      .all(sqliteCode, [],(err,rows)=>{
        if(err)reject(err)
          resolve(rows)
        })
    } catch (error) {
      reject(error)
    }
    db.close();
})}

async function databaseDelete({table,sqliteDelete}) {
  return new Promise((resolve,reject)=>{
    let db = openDatabase(reject)
    try {
      db.run(table)
      db.all(sqliteDelete, [],(err,rows)=>{
        if(err)reject(err)
          resolve(rows)
        })
    } catch (error) {
      reject(error)
    }
    db.close();
})}

const openDatabase = (reject) => new sqlite3.Database(path,sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) reject({error:err.message});
});