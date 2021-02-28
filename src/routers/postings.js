const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth');
const Postings = require('../models/postings');
const { getTorontoJobPosts, getEdmontonJobPosts, getCalgaryJobPosts, getVancouverJobPosts } = require('../scripts/scripts');

router.get("/postings", auth, async (req, res) => {

  try{
    const user = req.user._id
    const [yyz, yeg, yyc, yvr] = await Promise.all([getTorontoJobPosts(), getEdmontonJobPosts(), getCalgaryJobPosts(), getVancouverJobPosts()])
    const postings = yyz.concat(yeg, yyc, yvr)

    await Postings.findOneAndUpdate({user}, {postings})
    
    res.send({postings})
  
  } catch(error){
    res.status(400).send(error)
  }
})

module.exports = router
