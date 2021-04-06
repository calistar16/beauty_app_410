import express from 'express'
const { Pool, Client } = require('pg')
const jwt = require('jsonwebtoken')
const secret = 'my secret key'
const refreshTokenSecret = 'refresh secret'

const pool = new Pool({
  user: 'postgres',
  host: '0.0.0.0',
  database: 'postgres',
  password: 'tatcha',
  port: 5432,
})


export default function () {
  return {
    async authenticate (req: express.Request, res: express.Response) {
      res.status(200)
      const query = 'SELECT * FROM users WHERE username=($1) AND password=crypt(($2), password);'
      const values = [req.body.username, req.body.password]
      pool.query(query, values, (err: any, resp: any) => {
        console.log(err, resp)
        const user = resp.rows[0]
        if (user !== undefined) {
          // sign and encode
          const token = jwt.sign({
            username: req.body.username,
            user_id: user.user_id,
            admin: user.admin,
          }, secret, { expiresIn: '10m' })
          res.json({'token': token, 'username': req.body.username, 'user_id': user.user_id, 'email': user.email, 'admin': user.admin})
        }
        else {
          res.send({"Message": "Username or password incorrect"})
        }
      })
    },
    async logout (req: express.Request, res: express.Response) {
      res.header("Authentication", [''])
      res.status(200)
      res.send("Logout successful")
    }
  }
}