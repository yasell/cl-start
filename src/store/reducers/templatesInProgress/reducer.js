import { OrderedMap, List, Record } from 'immutable'
import { START, SUCCESS, FAIL } from '../../../constants/actions'
import { arrToMap } from '../../utils'
import * as types from './types'



const TemplatesRecord = Record({
  folders: new OrderedMap({}),
  templates: new OrderedMap({}),
  loading: false,
  loaded: false,
  deleted: false,
  error: null,
  message: null,
})

const FolderRecord = Record({
  id: null,
  key: null,
  parentId: null,
  title: null,
  chapter: null,
  children: new List([]),
  templates: new OrderedMap({}),
})

const TemplateRecord = Record({
  id: null,
  key: null,
  folder_id: null,
  status: null,
  title: null,
})

const templatesInProgress = (templatesInProgress = new TemplatesRecord(), action) => {
  const {type, response, error, payload} = action

  switch(type) {
    case types.GET_PROGRESS_TEMPLATES + START:
      return templatesInProgress
        .set('loading', true)

    case types.GET_PROGRESS_TEMPLATES + SUCCESS:
      const foldersData = []
      const templatesData = []

      // folder
      response.data.folders.forEach((folder) => {
        const folderData = {
          id: folder.id,
          key: `${folder.id}-${(~~(Math.random() * 1e8)).toString(16)}`,
          parentId: folder.parent_id,
          title: folder.title,
          chapter: folder.chapter,
          children: new List([]),
        }

        // folder sub-folder
        if (folder.children && folder.children.length > 0) {
          const subFoldersData = []

          folder.children.forEach((subFolder) => {
            const subFolderData = {
              id: subFolder.id,
              key: `${subFolder.id}-${(~~(Math.random() * 1e8)).toString(16)}`,
              parentId: subFolder.parent_id,
              title: subFolder.title,
              chapter: subFolder.chapter,
              children: new List([]),
            }

            if (subFolder.templates && subFolder.templates.length) {
              const subFolderTemplateData = []

              // folder sub-folder templates
              subFolder.templates.forEach((template) => {
                const templateData = {
                  id: template.id,
                  key: `${template.id}-${(~~(Math.random() * 1e8)).toString(16)}`,
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
        if (folder.templates && folder.templates.length > 0) {
          const subFolderTemplateData = []

          // sub-folder templates
          folder.templates.forEach((template) => {
            const templateData = {
              id: template.id,
              key: `${template.id}-${(~~(Math.random() * 1e8)).toString(16)}`,
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
          key: `${template.id}-${(~~(Math.random() * 1e8)).toString(16)}`,
          folder_id: template.folder_id,
          status: template.status,
          title: template.title,
        }

        templatesData.push(templateData)
      })

      return templatesInProgress
        .setIn(['folders'], arrToMap(foldersData, FolderRecord))
        .setIn(['templates'], arrToMap(templatesData, TemplateRecord))
        .set('loaded', true)
        .set('loading', false)

    case types.GET_PROGRESS_TEMPLATES + FAIL:
      return templatesInProgress
        .set('error', error)
        .set('message', error.response.data.message)
        .set('loading', false)

    default:
      return templatesInProgress
  }
}

export default templatesInProgress
