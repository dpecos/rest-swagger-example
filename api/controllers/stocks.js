import * as DAO from '../daos/index.js';
import * as Swagger from './swagger.js';

const dao = DAO.getInstance('memory');

import express from 'express';
export const router = express.Router();

/**
 * @swagger
 * /stocks:
 *   get:
 *     description: Retrieve the full list of stocks
 *     tags:
 *       - stocks
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: stocks
 *         schema:
 *           $ref: '#/definitions/Stocks'
 */
router.get('/', (req, res, next) => {
  const response = dao.retrieveAll();
  Swagger.validateModel('Stocks', response);
  res.send(response);
});

/**
 * @swagger
 * /stocks/{id}:
 *   get:
 *     description: Retrieve an specific stock
 *     tags:
 *       - stocks
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the stock to retrieve
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: stock
 *         schema:
 *           $ref: '#/definitions/Stock'
 */
router.get('/:id', (req, res, next) => {
  const response = dao.retrieve(parseInt(req.params.id, 10));
  Swagger.validateModel('Stock', response);
  res.send(response);
});

/**
 * @swagger
 * definitions:
 *   TimeStamp:
 *     type: object
 *     required:
 *       - lastUpdate
 *     properties:
 *       lastUpdate:
 *         type: number
 */

/**
 * @swagger
 * /stocks/{id}:
 *   put:
 *     description: Update lastUpdate field of an stock
 *     tags:
 *       - stocks
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the stock to update
 *         in: path
 *         required: true
 *         type: number
 *       - name: lastUpdate
 *         description: timestamp to use as stock's lastUpdate field
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/TimeStamp'
 *     responses:
 *       200:
 *         description: updated stock
 *         schema:
 *           $ref: '#/definitions/Stock'
 */
router.put('/:id', (req, res, next) => {
  Swagger.validateModel('TimeStamp', req.body);
  const response = dao.update(parseInt(req.params.id, 10), req.body.lastUpdate);
  Swagger.validateModel('Stock', response);
  res.send(response);
});

/**
 * @swagger
 * /stocks:
 *   post:
 *     description: Create a new stock
 *     tags:
 *       - stocks
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: stock
 *         description: Stock object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Stock'
 *     responses:
 *       200:
 *         description: new stock
 *         schema:
 *           $ref: '#/definitions/Stock'
 */
router.post('/', (req, res, next) => {
  Swagger.validateModel('Stock', req.body);
  const response = dao.create(req.body);
  Swagger.validateModel('Stock', response);
  res.send(response);
});
