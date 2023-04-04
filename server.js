const app = require('./src/app.js')

app.listen(5000, ()=>{
  console.log(`Server started in http://localhost:${5000}/`)
})