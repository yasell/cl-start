import { API } from '../../../constants/variables'
import * as types from './types'



export function addContract({data}) {
  return {
    type: types.ADD_CONTRACTS,
    postApi: `${API}contract/add`,
    postData: data,
    withAuth: true
  }
}

export function getContracts() {
  return {
    type: types.GET_CONTRACTS,
    getAPI: `${API}contracts/get`,
    withAuth: true
  }
}

// export const getCotracts = () => ({
//   type: types.GET_CONTRACTS
// })
