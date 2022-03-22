const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');

// rotas da home
route.get('/', homeController.paginaIicial); // só passa a referência
route.post('/', homeController.trataPost);

// rotas de contato
route.get('/contato', contatoController.paginaInicial);

module.exports = route;
