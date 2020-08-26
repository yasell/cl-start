import { API } from '../../../constants/variables'
import * as types from './types'



export function getSentTemplatesList() {
  return {
    type: types.GET_SENT_TEMPLATES,
    getAPI: `${API}folder/list/ENVELOPE_COMPLETE`,
    withAuth: true
  }
}

export function deleteTemplatesFolder(data) {
  return {
    type: types.DELETE_TEMPLATE_FOLDER,
    deleteApi: `${API}folder/delete/911`, // ${data.id}
    payload: {data},
    withAuth: true
  }
}
