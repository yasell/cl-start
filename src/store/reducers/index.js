import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import entities from './entities/reducer'
import templates from './templates/reducer'



const rootReducer = (history) => combineReducers({
  templates: templates,
  router: connectRouter(history)
})

export default rootReducer
