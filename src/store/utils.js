import { List, OrderedMap } from 'immutable'

export function arrToMap(arr, ItemRecord) {
  return arr.reduce(
    (acc, item) => acc.set(item.id, ItemRecord ? new ItemRecord(item) : item),
    new OrderedMap()
  )
}

export function redirectUser(url) {
  window.open(url, '_self')
}
