import Model from '../models/stock-model'

export default class StocksMemoryDAO {
  constructor () {
    this.data = new Map()

    this.createStock(1, 'AAPL', 161.17, Date.now())
    this.createStock(2, 'MSFT', 72.72, Date.now())
    this.createStock(3, 'GOOG', 930.38, Date.now())
  }

  createStock (id, name, currentPrice, lastUpdate) {
    this.data.set(id, new Model(id, name, currentPrice, lastUpdate))
  }

  retrieveAll () {
    return Array.from(this.data.values())
  }

  retrieve (id) {
    if (this.data.has(id)) {
      return this.data.get(id)
    } else {
      throw new Error(`Stock with id ${id} not found`)
    }
  }

  update (id, lastUpdate) {
    if (this.data.has(id)) {
      const stock = this.data.get(id)
      stock.lastUpdate = lastUpdate
      return this.retrieve(stock.id)
    } else {
      throw new Error(`Stock with id ${id} not found`)
    }
  }

  create (stock) {
    if (this.data.has(stock.id)) {
      throw new Error(`An stock with id ${stock.id} already exists`)
    } else {
      this.createStock(stock.id, stock.name, stock.currentPrice, stock.lastUpdate)
      return this.retrieve(stock.id)
    }
  }
}
