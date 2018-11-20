/*
Global Imports
*/
import express from 'express'
import Debug from 'debug'
import jwt from 'jsonwebtoken'
import { secret } from '../config'
import {
  hashSync as hash,
  compareSync as comparePasswords
} from 'bcryptjs'

// Models
import { User } from '../models'

const app = express.Router()

const debug = new Debug('platzi-overflow:auth');

app.post('/signin', async (req, res, next) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  // si no se encontro el usuario
  if(!user) {
    debug(`User with email ${email} not found`)
    return handleLoginFailed(res)
  }

  // si no es el password correcto
  if(!comparePasswords(password, user.password)) {
    debug(`Passwords do not match: ${password} !== ${user.password}`)
    return handleLoginFailed(res, 'Email and password don\'t match')
  }

  const token = createToken(user)

  res.status(200).json({
    message: 'Login success',
    token,
    userId: user._id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email
  })

})

// api/auth/signup
app.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body

  const u = new User({
    firstName,
    lastName,
    email,
    password: hash(password, 10)
  })

  debug(`Creating new user: ${u}`)

  const user = await u.save()
  const token = createToken(user)

  res.status(201).json({
    message: 'User saved',
    token,
    userId: user._id,
    firstName,
    lastName,
    email
  })
})

// Función para crear un json web token con duración de un día
const createToken = (user) => jwt.sign({ user }, secret, { expiresIn: 86400 })

function handleLoginFailed(res, message) {
  res.status(401).json({
    message: 'Login failed',
    error: message || 'Email doesn\'t exist'
  })
}

export default app