const express = require("express")
const router = new express.Router()
const auth = require("../middleware/auth")
const Tasks = require("../models/tasks")

router.post("/tasks", auth, async (req, res) => {

  const task = await new Tasks({
    ...req.body,
    user: req.user._id
  })

  try{
    await task.save()
    const tasks = await Tasks.find({ user: req.user._id }).sort({ deadline: 1 })

    res.status(200).send(tasks)
  } catch(error){
    res.status(400).send()
  }
})

router.get("/tasks", auth, async (req, res) => {

  try{
    const task = await Tasks.find().sort({deadline: 1})
    res.send(task)
  } catch(error){
    res.status(500).send()
  }
})

router.post("/tasks/:id", auth, async (req, res) => {

  const _id = req.params.id

  try{
    const task = await Tasks.findOne({ _id, user: req.user._id })

    if(!task){
      res.status(404).send({ error: "Invalid Request..." })
    }

    if(task.completed){
      task.completed = false
    } else{
      task.completed = true
    }
    await task.save()

    const tasks = await Tasks.find({ user: req.user._id }).sort({deadline: 1})
    res.send(tasks)

  }catch(error){
    res.status(400).send()
  }
})

router.delete("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id

  try{
    const task = await Tasks.findOneAndDelete({ _id, user: req.user._id })
    if(!task){
      return res.status(404).send()
    }

    const tasks = await Tasks.find({ user: req.user._id }).sort({deadline: 1})

    res.send(tasks)
  }catch(error){
    res.status(500).send()
  }
})

module.exports = router
