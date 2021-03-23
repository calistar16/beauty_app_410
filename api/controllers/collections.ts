import express from 'express'
const { Pool, Client } = require('pg')


export default function () {
  return {
    async getCollection (req: express.Request, res: express.Response) {
      res.status(200)
      res.send({'Collection': 123})
    },
    async createCollection (req: express.Request, res: express.Response) {
      res.status(201)
      res.send()
    },
    async getOneCollection (req: express.Request, res: express.Response) {
      res.status(200)
      res.send()
    },
    async renameCollection (req: express.Request, res: express.Response) {
      const rename = "Collection renamed to '" + req.body.name + "'"
      res.status(200)
      res.send({'Message': rename})
    }
  }
}