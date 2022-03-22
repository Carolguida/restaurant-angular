"use strict";
exports.__esModule = true;
var jsonServer = require("json-server");
var fs = require("fs");
var https = require("https");
var auth_1 = require("./auth");
var authz_1 = require("./authz");
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors and no-cache)
// array de callbacks
server.use(middlewares);
server.use(jsonServer.bodyParser);
// criando rota de login (middleware)
server.post('/login', (auth_1.handleAuthentication));
server.use('/orders', authz_1.handleAuthorization);
// Use default router
server.use(router);
// obter ref ao certificado e chave:
var options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
};
https.createServer(options, server).listen(3001, function () {
    console.log('JSON Server is running on https://localhost:3001');
});
// método use -> configura rota para todos os metodos do protocolo http.
// middlewares = retorna res quando quer devido ao uso do next() -> chama o next() -> passa para o proximo da fila no express
/* bodyParser :
 To handle POST, PUT and PATCH you need to use a body-parser -> middlewares
 parse do body
 You can use the one used by JSON Server */ 
