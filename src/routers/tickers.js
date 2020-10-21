const express = require('express');
const router = new express.Router();
const auth = require('../middleware/auth');
const Tickers = require('../models/tickers');
const { getStockPrices, getStockNews } = require('../scripts/scripts');

router.post("/tickers", auth, async (req, res) => {
  const user = req.user._id

  try{
    const stockTickers = await Tickers.findOne({ user })
    const [tickerData, news] = await Promise.all([getStockPrices(req.body.tickers), getStockNews(req.body.tickers)])

    if(!stockTickers){
      const newTickers = await new Tickers({ user: user, tickers: req.body.tickers, tickerData: tickerData, news: news })
      await newTickers.save()

      res.send(newTickers)
    }else{
      const newTickers = await Tickers.findOneAndUpdate({ user }, { tickers: req.body.tickers, tickerData: tickerData, news: news }, { new: true })
      res.send(newTickers)
    }
  } catch(error){
    res.status(404).send({error: error})
  }
})

router.get("/tickers", auth, async (req, res) => {
  const user = req.user._id

  try{
    const [tickerData, news, tickers] = await Promise.all([getStockPrices(req.body.tickers), getStockNews(req.body.tickers), Tickers.findOne({user})])
    Tickers.findOneAndUpdate({ user }, { tickers: tickers.tickers, tickerData: tickerData, news: news })

    if(tickerInfo){
      res.send({ tickers, tickerData, news })
    } else{
      res.status(404).send({error: "Data not found..."})
    }
  } catch(error){
    res.status(400).send({error: error})
  }
})

router.get("/tickers/refresh", auth, async (req, res) => {
  const user = req.user._id

  try{
    const findTickers = await Tickers.findOne({ user })
    if(findTickers){
      res.send({ tickers: findTickers.tickers, tickerData: findTickers.tickerData, news: findTickers.news })
    } else{
      res.status(404).send({error: "Data not found..."})
    }
  } catch(error){
    res.status(400).send({error: error})
  }
})

module.exports = router
