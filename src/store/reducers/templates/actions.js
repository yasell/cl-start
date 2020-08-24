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

export function getTemplatesList() {
  return {
    type: types.GET_TEMPLATES,
    getAPI: `${API}folder/list/TEMPLATE`,
    withAuth: true
  }
}
