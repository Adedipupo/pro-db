import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema({
  firstname: {
    type: String,
    default: null 
  },
  lastname: {
    type : String,
    default: null
  },
  email : {
    type : String,
    unqiue: true
  },
  password: {
    type : String,
  },
  token: {
    type : String,
  }
});

module.exports = mongoose.model('User', userSchema);