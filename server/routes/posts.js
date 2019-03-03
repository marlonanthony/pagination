const router = require('express').Router() 
const mongoose = require('mongoose') 

const Post = require('../models/Post')

router.get('/', (req, res) => {
  const pageOptions = {
    page: parseInt(req.query.page) || 0, 
    limit: parseInt(req.query.limit) || 25
    // offset: (page - 1) * 10 
    // offset = (page - 1) * itemsPerPage
  }

  Post.find()
  .sort({ date: -1 })
  .skip(pageOptions.page * pageOptions.limit)
  .limit(pageOptions.limit)
  .then(posts => res.status(200).json(posts))
  .catch(err => res.status(404).json({ nopostsfound: 'No posts found' }))
}) 

router.get('/:id', (req, res) => {
  Post.findById(req.params.id).then(post => res.json(post)) 
  .catch(err => console.log(err))
})
// router.get('/:id', (req, res) => {
//   Post.findById(req.params.id).then(post => res.json(post))
//   .catch(err => res.status(404).json({ nopostfound: 'No post found with that ID'})) 
// })


router.post('/', (req, res) => {
  const newPost = new Post({
    text: req.body.text 
  })
  newPost.save().then(post => res.json(post)) 
})

module.exports = router