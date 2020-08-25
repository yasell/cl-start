import { API } from '../../../constants/variables'
import * as types from './types'



export function getInProgressTemplatesList() {
  return {
    type: types.GET_PROGRESS_TEMPLATES,
    getAPI: `${API}folder/list/ENVELOPE_PROGRESS`,
    withAuth: true
  }
}
