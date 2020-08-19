import { combineReducers } from 'redux'

// import authentication from './pages/reducer'
import entities from './entities/reducer'
import contracts from './contracts/reducer'



const rootReducer = combineReducers({
  contracts: contracts,
  entities,
})

export default rootReducer;
