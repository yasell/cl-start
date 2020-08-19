export const loadingContractsSelector = (store) => store.contracts.loading
export const loadedContractsSelector = (store) => store.contracts.loaded
export const entitiesContractsSelector = (store) => store.contracts.entities.valueSeq().toArray()
