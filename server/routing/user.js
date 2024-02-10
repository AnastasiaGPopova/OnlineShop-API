const user = require("express").Router();
const { body } = require('express-validator');



const userController = require('../controllers/userController')

user.get('/login', userController.login
);

user.post('/register', userController.register
);

// user.post('/create-account',
//     body('email').isEmail().withMessage('Invalid email'),
//     body('password').isLength({ min: 8 }).withMessage('Invalid password').bail()
//         .matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))^[^ ]+$/).withMessage('Incorrect type of password'),
//     body('rePassword').custom((value, { req }) => {
//         return value == req.body.password;
//     }).withMessage('Password missmatch!'),
//     body('firstName').isLength({ min: 2, max: 100 }).withMessage('Invalid First Name'),
//     body('lastName').isLength({ min: 2, max: 100 }).withMessage('Invalid Last Name'),
//     userController.createAccount
// );




module.exports = user;