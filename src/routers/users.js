const express = require("express")
const router = new express.Router()
const Users = require('../models/users')
const Tasks = require('../models/tasks')
const Tickers = require('../models/tickers')
const Postings = require('../models/postings')
const auth = require("../middleware/auth")
const { getTorontoJobPosts, getEdmontonJobPosts, getCalgaryJobPosts, getVancouverJobPosts, getStockPrices, getStockNews } = require('../scripts/scripts');

router.post("/users", async (req, res) => {

  try{

    let findUser = await Users.findOne({ email: req.body.email })

    if(!findUser){
      const user = await new Users(req.body)
      await new Users({user: user._id})
      await new Postings({user: user._id})

      await user.save()
      const token = await user.generateAuthToken()

      res.status(201).send({ user, token })

    }else{
      res.status(400).send({ error: "Email already in use..."})
    }
  } catch(error){
    res.status(500).send({ error: "Internal Server Error..."})
  }
})

router.post("/users/login", async (req, res) => {
  try{
    const user = await Users.findByCredentials(req.body.email, req.body.password)
    const tasks = await Tasks.find({ user: user._id }).sort({ deadline: 1 })
    const stockTickers = await Tickers.findOne({ user: user._id})
    const [yyz, yeg, yyc, yvr, tickerData, news] = await Promise.all([getTorontoJobPosts(), getEdmontonJobPosts(), getCalgaryJobPosts(), getVancouverJobPosts(), getStockPrices(stockTickers.tickers), getStockNews(stockTickers.tickers)])
    const concat = yyz.concat(yeg, yyc, yvr)
    const postings = await Postings.findOneAndUpdate({ user: user._id }, {postings: concat}, { new: true })
    const tickers = await Tickers.findOneAndUpdate({ user: user._id }, { tickers: stockTickers.tickers, tickerData: tickerData, news: news }, { new: true })
    const token = await user.generateAuthToken()
    res.send({ user, token, tasks, tickers, postings })
  } catch (error){
    res.status(404).send({ error: "Invalid Username and Password"})
  }
})

router.post("/users/logout", auth, async (req, res) => {
  try{
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })

    await req.user.save()
    res.send()

  }catch(error){
    res.status(500).send()
  }
})

router.post("/users/logoutall", auth, async (req, res) => {
  try{
    req.user.tokens = new Array()
    await req.user.save()
    res.send()
  } catch(error){
    res.status(500).send()
  }
})

router.get("/users/me", auth, async (req, res) => {
  try{

    const tasks = await Tasks.find({ user: req.user._id }).sort({ deadline: 1 })
    const tickers = await Tickers.findOne({ user: req.user._id })
    const postings = await Postings.findOne({ user: req.user._id })

    res.send({ user: req.user, tasks: tasks, tickers: tickers, postings: postings})
  } catch(error){
    res.status(400).send()
  }
})

module.exports = router
