const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const userList = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(userList)
})

userRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    if (body.username.length <= 3 || body.password.length <= 3) {
      return response.status(400).json({
        error: 'Invalid format: both username and password must be at least 3 characters long'
      })
    }

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()
    response.json(savedUser)
  } catch(error) {
    next(error)
  }
})


module.exports = userRouter
