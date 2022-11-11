require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
const app = express()
const Hit = require('./models/hit')
const url = process.env.MONGODB_URI



app.use(express.json())
app.use(cors())

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })


app.get('/api/hitlist', (request, response) => {
  Hit.find({}).then(hitList => {
    response.json(hitList)
  })
})

app.post('/api/hitlist', (request, response) => {
  const body = request.body
  const newHit = new Hit({
    company: body.company,
    position: body.position,
    contact: body.contact,
    email: body.email,
    reachedOut: body.reachedOut,
    interviewScheduled: body.interviewScheduled,
    interviewFinished: body.interviewFinished,
    resume: ''
  })
  newHit.save().then(savedHit => {
    response.json(savedHit)
  })
})

app.put('/api/hitlist/:id', (request, response) => {
  const body = request.body
  const hit = {
    company: body.company,
    position: body.position,
    contact: body.contact,
    email: body.email,
    reachedOut: body.reachedOut,
    interviewScheduled: body.interviewScheduled,
    interviewFinished: body.interviewFinished,
    resume: body.resume
  }
  Hit.findByIdAndUpdate(request.params.id, hit, { new: true })
    .then(updatedHit => response.json(updatedHit))
})

app.delete('/api/hitlist/:id', (request, response) => {
  const id = String(request.params.id)
  Hit.findByIdAndDelete(id)
    .then(deletedHit => {
      response.json(deletedHit)
    })
})

app.post('/upload', (request, response) => {
  if (request.files === null) {
    return response.status(400).json({ msg: 'no file uploaded' })
  }

  const file = request.files.file

  file.mv(`${__dirname}/frontend/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err)
      return response.status(500).send(err)
    }

    response.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
  })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})