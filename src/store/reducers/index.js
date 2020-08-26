import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import templates from './templates/reducer'
import templatesInProgress from './templatesInProgress/reducer'
import templatesSent from './templatesSent/reducer'



const rootReducer = (history) => combineReducers({
  templates: templates,
  templatesInProgress: templatesInProgress,
  templatesSent: templatesSent,
  router: connectRouter(history)
})

export default rootReducer
