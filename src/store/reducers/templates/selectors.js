export const loadingContractsSelector = (store) => store.templates.loading
export const loadedContractsSelector = (store) => store.templates.loaded
export const entitiesContractsSelector = (store) => store.templates.entities.valueSeq().toArray()
