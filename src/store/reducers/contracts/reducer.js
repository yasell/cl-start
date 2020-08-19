import {OrderedMap, Record} from 'immutable'
import { START, SUCCESS, FAIL } from '../../../constants/actions'



const ContractsRecord = Record({
  entities: new OrderedMap({}),
  loading: false,
  loaded: false,
  error: null
})

const contracts = (contracts = new ContractsRecord(), action) => {
  const {type, response, error, payload} = action

  switch(type) {
    case 'GET_CONTRACTS' + START:
      return contracts
        .set('loading', true)

    case 'GET_CONTRACTS' + SUCCESS:
      return contracts
        .set('loading', false)

    case 'GET_CONTRACTS' + FAIL:
      return contracts
        .set('loading', false)

    default:
      return contracts
  }
}

export default contracts
