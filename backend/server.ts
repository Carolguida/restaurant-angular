import * as jsonServer from 'json-server'
import { Express } from 'express'
import * as fs from 'fs'
import * as https from 'https'
import { handleAuthentication } from './auth'

import { handleAuthorization } from './authz'

const server: Express = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
// array de callbacks
server.use(middlewares)

server.use(jsonServer.bodyParser)

// criando rota de login (middleware)
server.post('/login', (handleAuthentication))
server.use('/orders', handleAuthorization)

// Use default router
server.use(router)

// obter ref ao certificado e chave:
const options = {
  cert: fs.readFileSync('./backend/keys/cert.pem'),
  key: fs.readFileSync('./backend/keys/key.pem'),
}

https.createServer(options, server).listen(3001, () => {
  console.log('JSON Server is running on https://localhost:3001')
})

// método use -> configura rota para todos os metodos do protocolo http.
// middlewares = retorna res quando quer devido ao uso do next() -> chama o next() -> passa para o proximo da fila no express

/* bodyParser :
 To handle POST, PUT and PATCH you need to use a body-parser -> middlewares
 parse do body
 You can use the one used by JSON Server */