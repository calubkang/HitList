const hitsRouter = require('express').Router()
const Hit = require('../models/hit')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

// Get Token From Request
const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

hitsRouter.get('/', async (request, response) => {

  const token = request.headers.authorization

  if (token) {
    const decodedToken = jwt.verify(token.substring(7), process.env.SECRET)
    const hitList = await Hit.find({ user: decodedToken.id }).populate('user', { username: 1, name: 1 })
    response.json(hitList)
  }
})

hitsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const newHit = new Hit({
    user: user._id,
    company: body.company,
    position: body.position,
    contact: body.contact,
    email: body.email,
    reachedOut: body.reachedOut,
    interviewScheduled: body.interviewScheduled,
    interviewFinished: body.interviewFinished,
    resume: '',
    jobDescription: '',
  })
  const savedHit = await newHit.save()
  user.hits = user.hits.concat(savedHit._id)
  await user.save()
  response.json(savedHit)
})

hitsRouter.put('/:id', (request, response) => {
  const body = request.body
  const hit = {
    company: body.company,
    position: body.position,
    contact: body.contact,
    email: body.email,
    reachedOut: body.reachedOut,
    interviewScheduled: body.interviewScheduled,
    interviewFinished: body.interviewFinished,
    resume: body.resume,
    jobDescription: body.jobDescription
  }
  Hit.findByIdAndUpdate(request.params.id, hit, { new: true })
    .then(updatedHit => response.json(updatedHit))
})

hitsRouter.delete('/:id', (request, response) => {
  const id = String(request.params.id)
  Hit.findByIdAndDelete(id)
    .then(deletedHit => {
      response.json(deletedHit)
    })
})

module.exports = hitsRouter