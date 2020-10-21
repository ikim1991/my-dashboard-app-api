const mongoose = require('mongoose');

const postingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users"
  },
  postings: []
})

const Postings = mongoose.model("Postings", postingsSchema)

module.exports = Postings
