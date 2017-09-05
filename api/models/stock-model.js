/**
 * @swagger
 * definitions:
 *   Stock:
 *     type: object
 *     required:
 *       - id
 *       - name
 *       - currentPrice
 *       - lastUpdate
 *     properties:
 *       id:
 *         type: number
 *       name:
 *         type: string
 *       currentPrice:
 *         type: number
 *       lastUpdate:
 *         type: number
 *   Stocks:
 *     type: array
 *     items:
 *       $ref: '#/definitions/Stock'
 */
export default class Stock {
  constructor (id, name, currentPrice, lastUpdate) {
    this.id = id
    this.name = name
    this.currentPrice = currentPrice
    this.lastUpdate = lastUpdate
  }
}
