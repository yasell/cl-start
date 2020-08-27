import axios from 'axios'
import { START, SUCCESS, FAIL } from '../../constants/actions'



export default store => next => action => {
  const {postAPI, postData, withAuth, ...rest} = action

  if (!postAPI && !postData) return next({withAuth, ...rest})

  let config = {}

  if (withAuth) {
    // config = getHeaders()
  }

  next({...rest, type: rest.type + START})

  axios.post(postAPI, postData, config)
    .then(res => res.data)
    .then(res => {
      next({...rest, type: rest.type + SUCCESS, response: res})
    })
    .catch(error => {
      next({...rest, type: rest.type + FAIL, error})
    })
}
