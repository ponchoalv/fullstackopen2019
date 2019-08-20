const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comments')

router.post('/reset', async (request, reponse) => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  await Comment.deleteMany({})

  reponse.status(204).end()
})

module.exports = router
