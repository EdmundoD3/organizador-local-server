const router = require('express').Router();
const sqlite3 = require('sqlite3').verbose();

// Use the absolute address of the database file
const path = `${__dirname}`.slice(0, -6)+'\db\data.db';

router.get('/note', async (req, res) => {
  const {id} = req.body
  if (typeof(id) === 'number') res.json({error:'id is not a number'})
  //SQLite code
  const {note:table} = require('../sql/tables')
  const select = `SELECT * FROM notes WHERE id = '${id}'`
  //sqlite database
  database({table:table,insert:insert,select:select,res:res});
})

router.post('/note', async (req, res) => {
  const {title, content} = req.body
  if (typeof(id) === 'number') res.json({error:'id is not a number'})
  //SQLite code
  const {note:table} = require('../sql/tables')
  const insert = `INSERT OR IGNORE INTO note (title, content) VALUES('${title}, ${content}')`
  const select = `SELECT * FROM notes WHERE title = '${title}'  AND content = '${content}'`
  //sqlite database
  database({table:table,insert:insert,select:select,res:res});
})


module.exports = router;


  //database insert and return the data as confirmation
function database({table,insert,select,res}) {
  let db =  new sqlite3.Database(path,sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
      return console.error(err.message);
    }
  });
  db.serialize(() => {
    try {
      db.run(table)
      .run(insert)
      .each(select, (err, row) => {
        if (err){
          throw err;
        }
        res.json({row})
      });
      } catch (error) {
        console.log(error)
      }
  });
  db.close();
}