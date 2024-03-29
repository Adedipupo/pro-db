const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const { Schema } = mongoose

const userSchema = new Schema({
  // firstname: {
  //   type: String,
  //   default: null,
  // },
  username: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unqiue: true,
  },
  photo:{
    type: String,
  },
  role:{
    type: String,
    default: "regular",
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
},
  { timestamps: true }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('User', userSchema)
