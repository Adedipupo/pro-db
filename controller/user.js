const User = require('../model/user');
const { generateToken } = require('../utils/generateToken');


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

    await user.save()

    const token = await generateToken(user._id)

    user.password = undefined

    //Store cookie in the request body.
    res.cookie('token', token)
    return res.status(201).json({
      message: 'User successfully created!!!',
      data: user,
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

const loginUser = async(req, res) => { 

    try {
      const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(401).json({
          message: `User with this email does not exist`,
        })
      }

      const userPassword = await user.matchPassword(password);

      const token = await generateToken(user._id)


      res.cookie('authorization', token, {
        path: '/',
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        // sameSite: "none",
        // secure: true,
      })

      if(!user || !userPassword){
        return res.status(401).json({
          message: "Invalid username or password"
        });
      }

      if (user && userPassword) {
        res.status(200).json({
          _id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          token: generateToken(user._id),
        });
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        message: 'Internal Server Error',
        success: false,
      })
    }


}
const dashboard = async(req, res) => { 

    return res.send('dashboard is live');


}

module.exports = {
  registerUser,
  loginUser,
  dashboard
}
