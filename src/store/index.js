import { createStore, applyMiddleware, compose } from 'redux'

import rootReducer from './reducers'
import get from './middlewares/get'
import post from './middlewares/post'


const middlewares = [get]
let composeEnhancers = compose

if (process.env.NODE_ENV === 'development') {
  // middlewares.push(post)
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
}

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares)),
  )

  return store
}

export default configureStore;
