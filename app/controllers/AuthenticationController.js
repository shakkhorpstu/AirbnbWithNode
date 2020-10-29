const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const md5 = require('md5');
const User = require('../models/user');
const userValidation = require('../validation/user');
const mail = require('../helpers/mail');

/** 
 * Sign up the user
 * validate first
 * check email existence
 * generate hash password
 * save it to database
*/
const signup = async (req, res) => {
    const { error } = userValidation.signupValidation.validate(req.body);
    if(error) {
        return res.status(422).send(error.details[0].message);
    }

    let user = await User.findOne({ email: req.body.email });
    if(user) {
        return res.status(409).send("User already exist");
    }

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
    req.body.verify_token = md5(req.body.email);

    user = new User(req.body);
    user.save().then(response => {
        const url = `http://localhost:3000/users/verify/${req.body.verify_token}`;
        mail.send(response, url);
        res.status(200).send(response);
    })
    .catch(err => {
        res.status(500).send(err);
    })
}

/** 
 * Verify token of the user
*/
const verifyToken = async (req, res) => {
    User.findOne({ verify_token: req.params.token })
    .then(response => {
        if(response.verify_token) {
            console.log(data);
            User.findOneAndUpdate(
                { _id: response._id },
                { verified: true, verify_token: null }
            ).then(user => {
                console.log(user);
            }).catch(err => {
                console.log(err);
            });
        }
        res.status(200).send(response);
    })
    .catch(err => {
        res.status(500).send(err);
    })
}

/** 
 * Sign in the user
 * validate first
 * get the user with email
 * match the password
 * generate jwt token
*/
const signin = async (req, res) => {
    const { error } = userValidation.signinValidation.validate(req.body);
    if(error) {
        return res.status(422).send(error.details[0].message);
    }

    const user = await User.findOne({ email: req.body.email, verified: true });
    if(!user) {
        return res.status(401).send('Invalid credentials');
    }

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) {
        return res.status(401).send('Invalid credentials');
    }

    const token = await jwt.sign({ _id: user._id, name: user.first_name + ' ' + user.last_name }, process.env.JWT_SECRET);
    return res.header('Authorization', 'Bearer ' + token).send({token: token, user: user});
}

module.exports = {
    signup,
    verifyToken,
    signin
}