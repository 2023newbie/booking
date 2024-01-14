const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

const clientRoutes = require('./routes/client')
const adminRoutes = require('./routes/admin')

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

// route
app.use('/api/admin', adminRoutes)
app.use('/api', clientRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))
  app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'frontend', 'build', 'index.html')))
} else {
  app.get('/', (req, res) => res.send('API is running...'))
}

// connect database
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.opblshg.mongodb.net/${process.env.DB_DEFAULT_DATABASE}?retryWrites=true&w=majority`
  )
  .then(() => app.listen(5000))
  .catch(err => console.log(err))
