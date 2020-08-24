import { OrderedMap, Record } from 'immutable'
import { START, SUCCESS, FAIL } from '../../../constants/actions'
import { arrToMap } from '../../utils'
import * as types from './types'



const TemplatesRecord = Record({
  folders: new OrderedMap({}),
  templates: new OrderedMap({}),
  loading: false,
  loaded: false,
  error: null,
  message: null,
})

const FolderRecord = Record({
  id: null,
  parentId: null,
  title: null,
  chapter: null,
  children: new OrderedMap({}),
  templates: new OrderedMap({}),
})

const TemplateRecord = Record({
  id: null,
  folder_id: null,
  status: null,
  title: null,
})

const templates = (templates = new TemplatesRecord(), action) => {
  const {type, response, error, payload} = action

  switch(type) {
    case types.GET_TEMPLATES + START:
      return templates
        .set('loading', true)

    case types.GET_TEMPLATES + SUCCESS:
      const foldersData = []
      const templatesData = []

      // folder
      response.data.folders.forEach((folder) => {
        const folderData = {
          id: folder.id,
          parentId: folder.parent_id,
          title: folder.title,
          chapter: folder.chapter,
          children: new OrderedMap({}),
        }

        if (folder.children && folder.children.length) {
          const subFoldersData = []

          // folder sub-folder
          folder.children.forEach((subFolder) => {
            const subFolderData = {
              id: subFolder.id,
              parentId: subFolder.parent_id,
              title: subFolder.title,
              chapter: subFolder.chapter,
              children: new OrderedMap({}),
            }

            if (subFolder.templates && subFolder.templates.length) {
              const subFolderTemplateData = []

              // folder sub-folder templates
              subFolder.templates.forEach((template) => {
                const templateData = {
                  id: template.id,
                  folder_id: template.folder_id,
                  status: template.status,
                  title: template.title,
                }

                subFolderTemplateData.push(templateData)

                subFolderData.templates = arrToMap(subFolderTemplateData, TemplateRecord)
              })
            }

            subFoldersData.push(subFolderData)

            folderData.children = arrToMap(subFoldersData, FolderRecord)
          })
        }

        // folder templates
        if (folder.templates && folder.templates.length) {
          const subFolderTemplateData = []

          // sub-folder templates
          folder.templates.forEach((template) => {
            const templateData = {
              id: template.id,
              folder_id: template.folder_id,
              status: template.status,
              title: template.title,
            }

            subFolderTemplateData.push(templateData)

            folderData.templates = arrToMap(subFolderTemplateData, TemplateRecord)
          })
        }

        foldersData.push(folderData)
      })

      response.data.templates.forEach((template) => {
        const templateData = {
          id: template.id,
          folder_id: template.folder_id,
          status: template.status,
          title: template.title,
        }

        templatesData.push(templateData)
      })

      return templates
        .setIn(['folders'], arrToMap(foldersData, FolderRecord))
        .setIn(['templates'], arrToMap(templatesData, TemplateRecord))
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
