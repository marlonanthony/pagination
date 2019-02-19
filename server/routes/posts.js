const router = require('express').Router() 
const mongoose = require('mongoose') 

const Post = require('../models/Post')

router.get('/', (req, res) => {
  const pageOptions = {
    page: req.query.page || 0,
    limit: req.query.limit || 10
  }

  Post.find()
  .sort({ date: -1 })
  .skip(pageOptions.page * pageOptions.limit)
  .limit(pageOptions.limit)
  .then(posts => res.status(200).json(posts))
  .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }))
}) 

router.post('/', (req, res) => {
  const newPost = new Post({
    text: req.body.text 
  })
  newPost.save().then(post => res.json(post)) 
})

module.exports = router