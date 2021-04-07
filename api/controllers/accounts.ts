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
    async getAccount (req: express.Request, res: express.Response) {
      const token = req.headers.authorization;
      res.header('Access-Control-Allow-Origin', '*');
      if (token) {
          try {
            const decoded = await jwt.verify(token, secret)
            const query = 'SELECT * FROM users WHERE username=($1);'
            const values = [req.path.slice(10)]
            if (values[0] === decoded.username || decoded.admin) {
              pool.query(query, values, (err: any, resp: any) => {
                console.log(err, resp)
                const user = resp.rows[0]
                res.status(200)
                res.send({"Username": user['username'], "Email": user['email']})
              })
            }
            else {
              res.status(401)
              res.send({"Message" : "Get Unauthorized"})
            }
          } catch (e) {
            res.status(500)
            res.send("Expired Authorization")
          }
      }
      else {
        res.status(401)
        res.send({"Message" : "Route Unauthorized"})
      }
    },
    async createAccount (req: express.Request, res: express.Response) {
      res.status(201)
      const query = "INSERT INTO users(username, email, password) VALUES ($1, $2, crypt(($3), gen_salt('bf', 8)));"
      var values = [req.body.username, req.body.email, req.body.password]
      pool.query(query, values, (err: any, resp: any) => {
        console.log(err, resp)
        res.send({"Message": "Account created for " + req.body.username})
      })
    },
    async deleteAccount (req: express.Request, res: express.Response) {
      const token = req.headers.authorization;
      if (token) {
        try {
          const decoded = await jwt.verify(token, secret)
          res.status(204)
          const query = "DELETE FROM users WHERE username=($1);"
          var values = [req.path.slice(10)]
          if (values[0] === decoded.username || decoded.admin) {
            pool.query(query, values, (err: any, resp: any) => {
              console.log(err, resp)
              res.send({"Message": "Account deleted" + decoded.username})
            })
          }
          else {
            res.status(401)
            res.send({"Message" : "Delete Unauthorized"})
          }
        } catch (e) {
          res.status(500)
          res.send("Expired Authorization")
        }
      }
      else {
        res.status(401)
        res.send({"Message" : "Route Unauthorized"})
      }
    },
    async updateAccount (req: express.Request, res: express.Response) {
      const token = req.headers.authorization;
      if (token) {
        try {
          const decoded = await jwt.verify(token, secret)
          const query = "UPDATE users SET username=($1), email=($2), password=(crypt(($3), gen_salt('bf', 8))) WHERE user_id=(SELECT user_id WHERE username=($4));"
          var username = req.path.slice(10)
          if (username === decoded.username || decoded.admin) {
            const values = [username, req.body.email, req.body.password, username ]
            pool.query(query, values, (err: any, resp: any) => {
              console.log(err, resp)
              res.status(200)
              const update = "User \"" + username + "\" has been updated"
              res.send({'Message': "Account updated " + username})
            })
          }
          else {
            res.status(401)
            res.send({"Message" : "Update Unauthorized"})
          }
        } catch (e) {
          res.status(500)
          res.send("Expired Authorization")
        }
      }
      else {
        res.status(401)
        res.send({"Message" : "Route Unauthorized"})
      }
    }
  }
}