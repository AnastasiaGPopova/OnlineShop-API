const protected = require("express").Router();
const { body } = require('express-validator');



const protectedController = require('../controllers/protectedControler')

public.get('/', protectedController.getHome
);



module.exports = protected;