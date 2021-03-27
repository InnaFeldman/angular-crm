// Controller of authorization
const bcrypt = require('bcryptjs');//To encrypt user's password, to protect user's passw.
const jwt = require('jsonwebtoken'); //To generate token for password
const User = require('../models/User');
const keys = require('../config/keys');

module.exports.login = async function(req, res){
    const candidate = await User.findOne({email: req.body.email});

    if(candidate){
        //If user exists, check the password
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if(passwordResult){
            //If passwordes are matched, we need to generate token
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id,
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })

        }else {
            //The passwords are not matched
            res.status(401).json({
                message: "The passwords are not matched"
            });
        }
    }else{
        //There is no such user, error
        res.status(404).json({
            message: "User is not found"
        })
    }
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
        //To process Error
    }
  }
}