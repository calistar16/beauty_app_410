import Enforcer from 'openapi-enforcer'
import EnforcerMiddleware from 'openapi-enforcer-middleware'
import express from 'express'
import path from 'path'
import jwt from 'jsonwebtoken'
import authentication from './controllers/authentication'
import cors from 'cors'

// Create express instance
const app = express()

app.use(cors())

// Create a simple logging middleware
app.use((req, res, next) => {
  console.log(req.method.toUpperCase() + ' ' + req.path)
  next()
})

// Add Body Parser
app.use(express.json())

// Any paths defined in your openapi.yml will validate and parse the request
// before it calls your route code.
const openapiPath = path.resolve(__dirname, 'openapi.yml')
const enforcerMiddleware = EnforcerMiddleware(Enforcer(openapiPath))
app.use(enforcerMiddleware.init())

// Catch errors
enforcerMiddleware.on('error', (err: Error) => {
  console.error(err)
  // process.exit(1)
}) 

// Manually specify the baseURL
//app.use(enforcerMiddleware.init({ baseUrl: '/api' }))
// Here we use an object in the router with imports instead of a file path to the controllers directory.

app.use(enforcerMiddleware.route({
  accounts: import('./controllers/accounts'),
  collections: import('./controllers/collections'),
  products: import('./controllers/products'),
  authentication: import('./controllers/authentication'),
  items: import('./controllers/items'),
  pictures: import('./controllers/pictures')
}))

// const controllersPath = path.resolve(__dirname, 'controllers')
// app.use(enforcerMiddleware.route(controllersPath))

// Export express app
module.exports = app

// Start standalone server if directly running
if (require.main === module) {
  const port = process.env.PORT || 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}