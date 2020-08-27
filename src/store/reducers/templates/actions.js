import { API } from '../../../constants/variables'
import * as types from './types'



export function getTemplatesList() {
  return {
    type: types.GET_TEMPLATES,
    getAPI: `${API}folder/list/TEMPLATE`,
    withAuth: true
  }
}

export function deleteTemplatesFolder(data) {
  return {
    type: types.DELETE_TEMPLATE_FOLDER,
    deleteAPI: `${API}folder/delete/${data.id}`,
    payload: {data},
    withAuth: true
  }
}
