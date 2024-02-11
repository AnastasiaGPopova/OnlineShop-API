const user = require("express").Router();
const { body } = require('express-validator');

const userController = require('../controllers/userController')
const publicController = require('../controllers/publicController')

// user.get('/login', userController.login
// );

// user.post('/register', userController.register
// );



module.exports = user;