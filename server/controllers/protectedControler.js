const router = require('express').Router()
const parser = require('../utils/parser')

const userManager = require('../managers/userManager');

exports.getProtectedHome = async (req, res) => {
    try {
       console.log(`Hello from protected route`)
       res.send('Hello from protected route')
    } catch (error) {
        
    }
};

