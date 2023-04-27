const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')

connectToMongo();

const app = express()
const port = 5000
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));
app.use(cors())

//Available Routes

app.use('/api/auth',require('./routes/auth'))
app.use('/api/orders',require('./routes/orders'))
app.use('/api/orderlikes',require('./routes/likes'))
app.use('/api/cart',require('./routes/cart'))
app.use('/api/email',require('./routes/email'))
app.use('/api/product',require('./routes/products'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})