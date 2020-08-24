import { OrderedMap, Record } from 'immutable'
import { START, SUCCESS, FAIL } from '../../../constants/actions'
import { arrToMap } from '../../utils'
import * as types from './types'



const TemplatesRecord = Record({
  entities: new OrderedMap({}),
  loading: false,
  loaded: false,
  error: null,
  message: null,
})

const FoldersRecord = Record({
  id: null,
  parentId: null,
  title: null,
  chapter: null,
  children: new OrderedMap({}),
  templates: new OrderedMap({}),
})

const templates = (templates = new TemplatesRecord(), action) => {
  const {type, response, error, payload} = action

  switch(type) {
    case types.GET_TEMPLATES + START:
      return templates
        .set('loading', true)

    case types.GET_TEMPLATES + SUCCESS:
      const templatesData = []

      response.data.folders.forEach((folder) => {
        const folderData = {
          id: folder.id,
          parentId: folder.parent_id,
          title: folder.title,
          chapter: folder.chapter,
          children: new OrderedMap({}),
          templates: new OrderedMap({}),
        }

        templatesData.push(folderData)
      })

      return templates
        .setIn(['entities'], arrToMap(templatesData, FoldersRecord))
        .set('loaded', true)
        .set('loading', false)

    case types.GET_TEMPLATES + FAIL:
      return templates
        .set('error', error)
        .set('loading', false)

    default:
      return templates
  }
}

export default templates
