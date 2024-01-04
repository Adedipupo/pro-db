const User = require("../model/user");
const bcrypt = require("bcryptjs");



const registerUser = async (req, res) => {
    const {firstname , lastname, email, password } = req.body;

    if (!(firstname && lastname && email && password)){
        res.status(400).send({message: "All fields are required"});
    }

    const userExists =  await User.findOne({email});

    if (userExists) {
        res.status(200).send({message: "User already exists"});
    }


};

module.exports = {
    registerUser
}