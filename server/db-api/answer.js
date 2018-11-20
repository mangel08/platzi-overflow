import Debug from 'debug'
import { Answer } from '../models'

const debug = new Debug('platzi-overflow:db-api:question')

export default {

  getById: async (_id) => {
    debug(`Find answer with id ${_id}`)
    const answer = Answer
      .findOne({ _id })
      .populate('user')

    return answer
  }
}