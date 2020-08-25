import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'

import rootReducer from './reducers'
import history from '../store/history'
import get from './middlewares/get'
import post from './middlewares/post'
import del from './middlewares/delete'



const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer(history),
    preloadedState,
    storeEnhancers(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk,
        get,
        post,
        del
      )
    ),
  )

  return store
}

export default configureStore;
