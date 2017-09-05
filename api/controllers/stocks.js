import * as DAO from '../daos/'

const dao = DAO.getInstance('memory')

const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  const response = dao.retrieveAll()
  res.send(response)
})

router.get('/:id', (req, res, next) => {
  const response = dao.retrieve(parseInt(req.params.id, 10))
  res.send(response)
})

router.put('/:id', (req, res, next) => {
  const response = dao.update(parseInt(req.params.id, 10), req.body.lastUpdate)
  res.send(response)
})

router.post('/', (req, res, next) => {
  const response = dao.create(req.body)
  res.send(response)
})

module.exports = router
