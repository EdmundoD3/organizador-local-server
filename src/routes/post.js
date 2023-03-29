const router = require('express').Router();
const sqlite3 = require('sqlite3').verbose();

// Use the absolute address of the database file
const path = `${__dirname}`.slice(0, -6)+'\db\data.db';

router.post('/city', async (req, res) => {
  const {city} = req.body
  //SQLite code
  const {city:table} = require('../sql/tables')
  const insert = `INSERT OR IGNORE INTO city (city) VALUES('${city.toLowerCase()}')`
  const select = `SELECT * FROM city WHERE city = '${city.toLowerCase()}'`
  //sqlite database
  database({table:table,insert:insert,select:select,res:res});
})

router.post('/vendedora', async (req, res) => {
  const {vendedora} = req.body
  
  //SQLite code
  const {vendedora:table} = require('../sql/tables')
  const insert = `INSERT OR IGNORE INTO vendedora (vendedora) VALUES('${city.toLowerCase()}')`
  const select = `SELECT * FROM vendedora WHERE vendedora = '${vendedora.toLowerCase()}'`
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

router.post('/', async (req, res) => {
  const body = req.body
  console.log(Object.keys(body))
  const arr = insertOrder.filter(e=>Object.hasOwn(body, e))
  console.log(arr)
  //SQLite code
  // const {city:table} = require('../sql/tables')
  // const insert = `INSERT OR IGNORE INTO city (city) VALUES('${city.toLowerCase()}')`
  // const select = `SELECT * FROM city WHERE city = '${city.toLowerCase()}'`
  //sqlite database
  // database({table:table,insert:insert,select:select,res:res});
  res.json({arr})
})

const insertOrder=['cobrador', 'status', 'vendedora',
'cliente',
'state', 'colonia', 'city', 
'addres', 'cuenta',
'productos', 'pagos',
'compra'
]


// cobrador status vendedora
// cliente
// state colonia city 
// addres cuenta
// productos pagos
// compra