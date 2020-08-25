import { API } from '../../../constants/variables'
import * as types from './types'



export function getTemplatesList() {
  return {
    type: types.GET_TEMPLATES,
    getAPI: `${API}folder/list/TEMPLATE`,
    withAuth: true
  }
}

export function getInProgressTemplatesList() {
  return {
    type: types.GET_PROGRESS_TEMPLATES,
    getAPI: `${API}folder/list/ENVELOPE_PROGRESS`,
    withAuth: true
  }
}

export function getCompleteTemplatesList() {
  return {
    type: types.GET_COMPLETE_TEMPLATES,
    getAPI: `${API}folder/list/ENVELOPE_COMPLETE`,
    withAuth: true
  }
}

export function deleteContract(data) {
  return {
    type: types.DELETE_TEMPLATE,
    deleteApi: `${API}folder/delete/0`, // ${templateId}
    payload: {data},
    withAuth: true
  }
}
