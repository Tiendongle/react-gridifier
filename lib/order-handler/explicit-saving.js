'use strict'

import EventEmitter from 'events'

export default class ExplicitSaving extends EventEmitter {
  constructor () {
    super()
    this.currentOrder = []
    this.persistedOrder = []
  }

  parseGridChildren (gridNode) {
    const children = []
    for (const i of gridNode.children) {
      children.push({ id: i.id, guid: i.attributes['data-gridifier-guid'].value })
    }
    return children.sort((a, b) => {
      return a.guid - b.guid
    })
  }

  onChange (gridNode) {
    const order = this.parseGridChildren(gridNode)
    this.currentOrder = order
  }

  persistOrder () {
    this.persistedOrder = this.currentOrder
  }

  restoreOrder () {
    this.emit('sort-order-list', this.persistedOrder)
  }
}

export { default as LocalStorage } from './auto-storage'
