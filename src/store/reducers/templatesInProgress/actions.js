import { API } from '../../../constants/variables'
import * as types from './types'



export function getInProgressTemplatesList() {
  return {
    type: types.GET_PROGRESS_TEMPLATES,
    getAPI: `${API}folder/list/ENVELOPE_PROGRESS`,
    withAuth: true
  }
}

export function deleteTemplatesFolder(data) {
  return {
    type: types.DELETE_PROGRESS_TEMPLATE_FOLDER,
    deleteApi: `${API}folder/delete/${data.id}`,
    payload: {data},
    withAuth: true
  }
}
