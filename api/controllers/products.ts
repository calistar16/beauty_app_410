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
    async getProduct (req: express.Request, res: express.Response) {
      //const token = req.headers.authorization;
      // if (token) {
      //   try {
      //     const decoded = await jwt.verify(token, secret)
      //   } catch (e) {
      //     res.status(500)
      //     res.send("Expired Authorization")
      //   }
        const query = 'SELECT * FROM products WHERE prod_id=($1);'
        const values = [req.path.slice(10)]
        pool.query(query, values, (err: any, resp: any) => {
          console.log(err, resp)
          const product = resp.rows[0]
          res.status(200)
          console.log(product)
          res.send(product)
        })
      // }
      // else {
      //   res.status(401)
      //   res.send("Unauthorized")
      // }
    },
    async createProduct (req: express.Request, res: express.Response) {
      res.status(201)
      const query = "INSERT INTO products(prod_name, price, category, prod_type, shades, description, brand, ingredients) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)"
      var values = [req.body.prod_name, req.body.price, req.body.category, req.body.prod_type, req.body.shades, req.body.description, req.body.brand, req.body.ingredients]
      pool.query(query, values, (err: any, resp: any) => {
        console.log(err, resp)
        res.send()
      })
    },
    async deleteProduct (req: express.Request, res: express.Response) {
      res.status(204)
      const query = "DELETE FROM products WHERE prod_id=($1);"
      var values = [req.path.slice(10)]
      pool.query(query, values, (err: any, resp: any) => {
        console.log(err, resp)
        res.send(values)
      })
    },
    async updateProduct (req: express.Request, res: express.Response) {
      const query = "UPDATE products SET prod_name=($1), price=($2), category=($3), prod_type=($4), shades=($5), description=($6), brand=($7), ingredients=($8) WHERE prod_id=($9);"
      var product_id = req.path.slice(10)
      const values = [req.body.prod_name, req.body.price, req.body.category, req.body.prod_type, req.body.shades, req.body.description, req.body.brand, req.body.ingredients, product_id]
      pool.query(query, values, (err: any, resp: any) => {
        console.log(err, resp)
        res.status(200)
        const update = "Product " + req.body.prod_name + " updated to [" + values + "]"
        res.send({'Message': update})
      })
    },
    async uploadProduct (req: express.Request, res: express.Response) {
      res.status(200)
      res.send({'Message': "upload product"})
    },
    async deletePicture (req: express.Request, res: express.Response) {
      res.status(200)
      res.send({'Message': "delete picture"})
    },
    async updatePicture (req: express.Request, res: express.Response) {
      res.status(200)
      res.send({'Message': "updatePicture"})
    }
  }
}