// Controller of authorization
const bcrypt = require('bcryptjs');//To encrypt user's password, to protect user's passw.
const User = require('../models/User');

module.exports.login = function(req, res){
    res.status(200).json({
        login: {
            email: req.body.email,
            password: req.body.password
        }
     })
}

module.exports.register = async function(req, res){
    //email password
  ///If email and password already exist
  const candidate = await User.findOne({email: req.body.email}) // (async await) - Code is waiting for execution of code from functionUser.findOne({email: req.body.email} and then continue ti execute rest of code.

  if (candidate) {
      //If user exist, show an error
      //https://httpstatuses.com/
      res.status(409).json({
          message: 'This email already exist. Try another one.' 
      })
  }else {
      // If there is no such user, create a user
    const salt = bcrypt.genSaltSync(10);// To encrypt passw.
    const password = req.body.password; //Passw. from user

    const user = new User({
        email: req.body.email,
        password: bcrypt.hashSync(password, salt)//When we create user instade of user's passw. we'll get hash
    })

    try {
        await user.save();
        res.status(201).json(user)
    }catch(e) {
        //TO process Error
    }
  }
}