const User = require('../model/user')
const bcrypt = require('bcryptjs')
const { generateToken } = require('../utils/generateToken')

const registerUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body

    if (!(firstname && lastname && email && password)) {
      res.status(400).send({ message: 'All fields are required' })
    }

    const userExists = await User.findOne({ email })

    if (userExists) {
      res.status(200).send({ message: 'User already exists' })
    }

    const user = await User.create({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password,
    })

    await newUser.save()

    const token = await generateToken(user._id)

    user.password = undefined

    //Store cookie in the request body.
    res.cookie('token', token)
    return res.status(201).json({
      message: 'User successfully created!!!',
      data: newUser,
      token: token,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: 'Internal Server Error',
      success: false,
    })
  }
}

module.exports = {
  registerUser,
}
