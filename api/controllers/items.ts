import express from 'express'
const { Pool, Client } = require('pg')
const jwt = require('jsonwebtoken')
const secret = 'my secret key'

const pool = new Pool({
  user: 'postgres',
  host: '0.0.0.0',
  database: 'postgres',
  password: 'tatcha',
  port: 5432,
})

export default function () {
  return {
    async getItem (req: express.Request, res: express.Response) {
      res.status(200)
      res.send({"Item": "GET"})
    },
    async newItem (req: express.Request, res: express.Response) {
      res.status(200)
      res.send({"Item": "POST"})
    },
    async deleteItem (req: express.Request, res: express.Response) {
      res.status(204)
      res.send({"Item": "DELETE"})
    },
    async updateItem (req: express.Request, res: express.Response) {
      res.status(200)
      res.send({"Item": "PUT"})
    },
    async uploadPicture (req: express.Request, res: express.Response) {
      res.status(200)
      res.send({'Message': "upload item pic"})
    },
    async deletePicture (req: express.Request, res: express.Response) {
      res.status(200)
      res.send({'Message': "delete item pic"})
    },
    async updatePicture (req: express.Request, res: express.Response) {
      res.status(200)
      res.send({'Message': "update item pic"})
    }
  }
}