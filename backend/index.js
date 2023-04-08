const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')

connectToMongo();

const app = express()
const port = 5000
app.use(express.json())
app.use(cors())

//Available Routes

app.use('/api/auth',require('./routes/auth'))
app.use('/api/orders',require('./routes/orders'))
app.use('/api/orderlikes',require('./routes/likes'))
app.use('/api/cart',require('./routes/cart'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})