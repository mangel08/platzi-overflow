import Debug from 'debug'
import { Question } from '../models'
import { Answer } from '../models'

const debug = new Debug('platzi-overflow:db-api:question')

export default {

  findAll: async () => {
    debug('Finding all questions')
    const question = Question.find().populate('answers')
    return question
  },

  findById: async (_id) => {
    debug(`Find question with id ${_id}`)
    const question = Question
      .findOne({ _id })
      .populate('user')
      .populate({
        path: 'answers',
        options: { sort: '-createdAt' },
        populate: {
          path: 'user',
          model: 'User'
        }
      })

    return question
  },

  create: async (q) => {
    debug(`Creating new question ${q}`)
    const question = new Question(q)
    return question.save()
  },

  createAnswer: async (q, a) => {
    const answer = new Answer(a)
    const savedAnswer = await answer.save()
    q.answers.push(savedAnswer)
    await q.save()
    return savedAnswer
  }

}