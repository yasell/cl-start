import axios from 'axios'
import { START, SUCCESS, FAIL } from '../../constants/actions'



export default store => next => action => {
  const {deleteAPI, withAuth, ...rest} = action

  if (!deleteAPI) return next(rest)

  let config = {}

  if (withAuth) {
    // config = getHeaders()
  }

  next({...rest, type: rest.type + START})

  axios.delete(deleteAPI, config)
    .then(res => res.data)
    .then(response =>
      next({...rest, type: rest.type + SUCCESS, response: response})
    )
    .catch(error => {
      next({...rest, type: rest.type + FAIL, error})
    })
}
