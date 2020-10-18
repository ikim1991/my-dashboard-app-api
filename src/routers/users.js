const express = require("express")
const router = new express.Router()
const Users = require('../models/users')
const Tasks = require('../models/tasks')
const auth = require("../middleware/auth")

router.post("/users", async (req, res) => {

  try{

    let findUser = await Users.findOne({ email: req.body.email })

    if(!findUser){
      const user = await new Users(req.body)

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
    const token = await user.generateAuthToken()
    res.send({ user, token, tasks })
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

    res.send({ user: req.user, tasks: tasks})
  } catch(error){
    res.status(400).send()
  }
})

module.exports = router
