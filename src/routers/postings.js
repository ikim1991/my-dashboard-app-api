const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth');
const Postings = require('../models/postings');
const { getTorontoJobPosts, getEdmontonJobPosts, getCalgaryJobPosts, getVancouverJobPosts } = require('../scripts/scripts');

router.get("/postings", auth, async (req, res) => {

  const user = req.user._id

  try{
    const prevPostings = await Postings.findOne({user})
    const [yyz, yeg, yyc, yvr] = await Promise.all([getTorontoJobPosts(), getEdmontonJobPosts(), getCalgaryJobPosts(), getVancouverJobPosts()])
    const postings = yyz.concat(yeg, yyc, yvr)

    if(!prevPostings){
      const newPostings = await new Postings({ user, postings })
      await newPostings.save()
      res.send(newPostings)
    }else{
      const newPostings = await Postings.findOneAndUpdate({user}, {postings}, { new: true })
      res.send(newPostings)
    }

  } catch(error){
    res.status(400).send(error)
  }
})

module.exports = router
