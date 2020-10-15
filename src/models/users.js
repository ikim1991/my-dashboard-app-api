const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const validator = require("validator")
const jwt = require("jsonwebtoken")

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    requried: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid Email...")
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value){
      if(value.toLowerCase().includes("password")){
        throw new Error("Invalid Password...")
      }
    }
  },
  tokens: [{
    token:{
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
})

usersSchema.methods.generateAuthToken = async function(){
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
  user.tokens = user.tokens.concat({ token })
  await user.save()
  return token
}

usersSchema.statics.findByCredentials = async (email, password) => {
  const user = await Users.findOne({ email: email })
  if(!user){
    throw new Error("Unable to Log In")
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch){
    throw new Error("Unable to Log In")
  }

  return user
}

usersSchema.methods.toJSON = function() {
  const user = this
  const userObject = user.toObject()

  delete userObject.password

  return userObject
}

usersSchema.pre("save", async function(next){
  const user = this

  if(user.isModified("password")){
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

usersSchema.pre("remove", async function(next){
    const user = this
    await Task.deleteMany({ user: user._id })
    next()
})

const Users = mongoose.model("Users", usersSchema)
module.exports = Users
