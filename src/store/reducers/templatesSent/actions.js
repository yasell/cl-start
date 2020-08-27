import { API } from '../../../constants/variables'
import * as types from './types'



export function getSentTemplatesList() {
  return {
    type: types.GET_SENT_TEMPLATES,
    getAPI: `${API}folder/list/ENVELOPE_COMPLETE`,
    withAuth: true
  }
}

export function addTemplatesFolder(data) {
  return {
    type: types.ADD_TEMPLATE_FOLDER,
    postAPI: `${API}folder/create`,
    payload: data,
    postData: data
  }
}

export function deleteTemplatesFolder(data) {
  return {
    type: types.DELETE_SENT_TEMPLATE_FOLDER,
    deleteAPI: `${API}folder/delete/${data.id}`,
    payload: {data},
    withAuth: true
  }
}
