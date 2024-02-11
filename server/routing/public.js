const public = require("express").Router();
const { body } = require('express-validator');



const publicController = require('../controllers/publicController')

public.get('/', publicController.getHome
);



module.exports = public;