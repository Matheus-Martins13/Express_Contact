const express = require('express');
const route = express.Router();

const homeController = require('./src/controllers/homeController');
const loginController = require('./src/controllers/loginController');
const registerController = require('./src/controllers/registerController')

// rotas da home
route.get('/', homeController.index);

// rotas de login
route.get('/login/index', loginController.index);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout)

//rotas registro
route.get('/register/index', registerController.index);
route.post('/register/register', registerController.register); 

module.exports = route;
