const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const jwt = require("jsonwebtoken");
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('hits', {
    company: 1,
    position: 1,
    contact: 1,
    email: 1,
    reachedOut: 1,
    interviewScheduled: 1,
    interviewFinished: 1,
    resume: 1,
}) 
  response.json(users)  
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })
  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    {}
  )

  const savedUser = await user.save()

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })

})

module.exports = usersRouter