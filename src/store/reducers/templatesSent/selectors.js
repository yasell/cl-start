export const loadingTemplatesSentSelector = (store) => store.templatesSent.loading
export const loadedTemplatesSentSelector = (store) => store.templatesSent.loaded
export const createdTemplatesSentSelector = (store) => store.templatesSent.created
export const deletedTemplatesSentSelector = (store) => store.templatesSent.deleted
export const foldersTemplatesSentSelector = (store) => store.templatesSent.folders.valueSeq().toArray()
export const templatesTemplatesSentSelector = (store) => store.templatesSent.templates.valueSeq().toArray()

