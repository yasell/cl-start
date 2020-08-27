import axios from 'axios'
import { START, SUCCESS, FAIL } from '../../constants/actions'



export default store => next => action => {
  const {putAPI, putData, withAuth, ...rest} = action

  if (!putAPI && !putData) return next({withAuth, ...rest})

  let config = {}

  if (withAuth) {
    // config = getHeaders()
  }

  next({...rest, type: rest.type + START})

  axios.put(putAPI, putData, config)
      .then(res => res.data)
      .then(res => {
          next({...rest, type: rest.type + SUCCESS, response: res})
      })
      .catch(error => {
          next({...rest, type: rest.type + FAIL, error})
      })
}
