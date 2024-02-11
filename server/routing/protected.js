const protected = require("express").Router();
const { body } = require('express-validator');
const {isAuthenticatedUser} = require("../middlewares/authMiddleware")


const protectedController = require('../controllers/protectedControler')

protected.get('/', protectedController.getProtectedHome
);



module.exports = protected;