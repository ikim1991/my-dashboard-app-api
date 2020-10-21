const mongoose = require('mongoose');

const tickersSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users"
  },
  tickers: [],
  tickerData: [],
  news: []
})

const Tickers = mongoose.model("Tickers", tickersSchema)

module.exports = Tickers
