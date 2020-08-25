import axios from 'axios'
import { START, SUCCESS, FAIL } from '../../constants/actions'



export default store => next => action => {
  const {deleteApi, withAuth, ...rest} = action

  if (!deleteApi) return next(rest)

  let config = {}

  if (withAuth) {
    // config = getHeaders()
  }

  next({...rest, type: rest.type + START})

  axios.delete(deleteApi, config)
    .then(res => res.data)
    .then(response =>
      next({...rest, type: rest.type + SUCCESS, response: response})
    )
    .catch(error => {
      next({...rest, type: rest.type + FAIL, error})
    })
}
