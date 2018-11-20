// Global imports
import express from 'express'
import { required, questionMiddleware } from '../middlewares'
import { question, answer } from '../db-api'
import { handleError } from '../util'
import Debug  from 'debug'

// Models
import { User } from '../models'

// Config
const app = express.Router()


// GET api/questions
// Endpoint to get the all questions
app.get('/', async (req, res) => {
  try {
    const questions = await question.findAll()
    // console.log(questions)
    res.status(200).json(questions)
  } catch (error) {
    handleError(error, res)
  }
})

// GET api/questions/:id
// Endpoint to get a questions by id
app.get('/:id', questionMiddleware, async (req, res) => {
  try {
    res.status(200).json(req.question)
  } catch (error) {
    handleError(error, res)
  }
})

// POST api/questions
// Endpoint to save a question
app.post('/', required, async (req, res) => {

  const { title, description, icon } = req.body
  const q = {
    title,
    description,
    icon,
    user: req.user._id //Lo retorna el middleware required accediendo a token.user
  }

  try {
    const savedQuestion = await question.create(q)
    console.log(savedQuestion)
    res.status(201).json(savedQuestion)
  } catch(error) {
    handleError(error, res)
  }

})

// POSt api/questions/id/answer
// Endpoint to save the answers of a question
app.post('/:id/answers', required, questionMiddleware, async (req, res) => {
  const a = req.body
  const q = req.question
  a.createdAt = new Date()
  a.user = req.user._id
  try {
    const savedAnswer = await question.createAnswer(q, a)
    const ans = answer.findById(savedAnswer._id)
    res.status(201).json(ans)
  } catch(error) {
    handleError(error, res)
  }
})

export default app
