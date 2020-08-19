import axios from 'axios'
import { START, SUCCESS, FAIL } from '../../constants/actions'



export default store => next => action => {
  const {getAPI, withAuth, ...rest} = action

  if (!getAPI) return next({withAuth, ...rest})

  let config = {}

  if (withAuth) {
    // config = getHeaders()
  }

  next({...rest, type: rest.type + START})

  axios.get(getAPI, config)
    .then(res => res.data)
    .then(res => {
      console.log(res)
      next({...rest, type: rest.type + SUCCESS, response: res})
    })
    .catch(error => {
      console.log({error})
      next({...rest, type: rest.type + FAIL, error})
    })
}
