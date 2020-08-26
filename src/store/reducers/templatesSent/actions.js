import { API } from '../../../constants/variables'
import * as types from './types'



export function getSentTemplatesList() {
  return {
    type: types.GET_SENT_TEMPLATES,
    getAPI: `${API}folder/list/ENVELOPE_COMPLETE`,
    withAuth: true
  }
}
