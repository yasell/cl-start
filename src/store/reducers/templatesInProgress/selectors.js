export const loadingTemplatesInProgressSelector = (store) => store.templatesInProgress.loading
export const loadedTemplatesInProgressSelector = (store) => store.templatesInProgress.loaded
export const deletedTemplatesInProgressSelector = (store) => store.templatesInProgress.deleted
export const foldersTemplatesInProgressSelector = (store) => store.templatesInProgress.folders.valueSeq().toArray()
export const templatesTemplatesInProgressSelector = (store) => store.templatesInProgress.templates.valueSeq().toArray()

