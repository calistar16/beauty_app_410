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
    async deletePictures (req: express.Request, res: express.Response) {
        res.status(200)
        res.send({'Message': "delete pic"})
    },
    async getPicture (req: express.Request, res: express.Response) {
    res.status(200)
    res.send({'Message': "get picture"})
    }
  }
}