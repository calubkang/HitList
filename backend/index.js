require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const Hit = require('./models/hit')
const User = require('./models/user')
const url = process.env.MONGODB_URI
const usersRouter = require('./controllers/users')
const hitsRouter = require('./controllers/hits')
const loginRouter = require('./controllers/login')




app.use(express.json())
app.use(cors())


mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

app.use('/api/hitlist', hitsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)



const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app