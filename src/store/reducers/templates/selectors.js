export const loadingTemplatesSelector = (store) => store.templates.loading
export const loadedTemplatesSelector = (store) => store.templates.loaded
export const foldersTemplatesSelector = (store) => store.templates.folders.valueSeq().toArray()
export const templatesTemplatesSelector = (store) => store.templates.templates.valueSeq().toArray()
