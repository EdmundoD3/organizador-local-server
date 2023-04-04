const sqlite3 = require('sqlite3').verbose();
// Use the absolute address of the database file
const path = `${__dirname}\\data.db`;

const database = {
  get: async ({table,sqliteCode}) => {
    return new Promise((resolve,reject)=>{
      let db =  openDatabase(reject)

      db.run(table)
      db.all(sqliteCode,[],(err,rows)=>{
        if(err)reject(err)
        resolve(rows)
        })
      db.close();
  })},
  post: async ({table,insert,tableName}) => {
    return new Promise((resolve,reject)=>{
      let db =  openDatabase(reject)
      try {
        db.run(table)
        db.all(insert)
        db.all(` SELECT * FROM ${tableName} WHERE id = (SELECT MAX(id) FROM ${tableName}) `, [],(err,rows)=>{
          if(err)reject(err)
          resolve(rows)
        })
          
      } catch (error) {
        reject(error)
      }
      
      db.close();
  })},
  put: async ({table,update,sqliteCode}) => {
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
  })},
  delete: async ({table,sqliteDelete}) => {
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
}
  
  const openDatabase = (reject) => new sqlite3.Database(path, (err) => {
    if (err) reject({error:err.message});
  });

module.exports = database