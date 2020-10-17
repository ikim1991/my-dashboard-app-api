const mongoose = require("mongoose")

const tasksSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  deadline: {
    type: Date,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users"
  }
},
{
  timestamps: true
})

const Tasks = mongoose.model("Tasks", tasksSchema)

module.exports = Tasks
