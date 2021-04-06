import express from 'express'
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: '0.0.0.0',
  database: 'postgres',
  password: 'tatcha',
  port: 5432,
})

export default function () {
  return {
    async getCollection (req: express.Request, res: express.Response) {
      const query = 'SELECT * FROM collections WHERE user_id=($1);'
      const values = [req.body.user_id]
      pool.query(query, values, (err: any, resp: any) => {
        console.log(err, resp)
        const collections = resp.rows
        res.status(200)
        console.log(collections)
        res.send(collections)
      })
    },
    async createCollection (req: express.Request, res: express.Response) {
      res.status(201)
      const query = "INSERT INTO collections(name, user_id) VALUES ($1, $2)"
      var values = [req.body.name, req.body.user_id]
      pool.query(query, values, (err: any, resp: any) => {
        console.log(err, resp)
        res.send()
      })
    },
    async getOneCollection (req: express.Request, res: express.Response) {
      const query = 'SELECT * FROM collections WHERE id=($1);'
      const values = [req.path.slice(13)]
      pool.query(query, values, (err: any, resp: any) => {
        console.log(err, resp)
        const collections = resp.rows
        res.status(200)
        console.log(collections)
        res.send(collections)
      })
    },
    async renameCollection (req: express.Request, res: express.Response) {
      const rename = "Collection renamed to '" + req.body.name + "'"
      res.status(200)
      res.send({'Message': rename})
    },
    async deleteCollection (req: express.Request, res: express.Response) {
      res.status(200)
      res.send({'Message': "deleted"})
    },
    async deleteItemCollection (req: express.Request, res: express.Response) {
      res.status(200)
      res.send({'Message': "item collection delete"})
    },
    async collectionItem (req: express.Request, res: express.Response) {
      res.status(200)
      res.send({'Message': "item"})
    },
    async collectionProduct (req: express.Request, res: express.Response) {
      res.status(200)
      res.send({'Message': "product"})
    }
  }
}