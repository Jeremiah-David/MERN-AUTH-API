const passport = require('passport')
const Strategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const options = {
    secretOrKey: process.env.JWT_SECRET,

    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const findUser = (jwt_payload, done) => {
    User.findById(jwt_payload.id)
        .then(foundUser => done(null, foundUser))
        .catch(err => done(err))
}

const strategy = new Strategy(options, findUser)

passport.use(strategy)


passport.initialize()

const createUserToken = (req, user) => {
    const validPassword = req.body ?
        bcrypt.compareSync(req.body.password, user.password) : false
    if (!user || !validPassword) {
        const err = new Error('THe provided email OR password is incorrect')
        err.statusCode = 422
        throw err
    } else {
        const payload = {
            id: user._id,
            email: user.email,
            motto: user.motto
        }
        return jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: 3600} )
    }
}
