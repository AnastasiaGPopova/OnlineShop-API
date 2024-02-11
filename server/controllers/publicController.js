const router = require('express').Router()
const parser = require('../utils/parser')

const userManager = require('../managers/userManager');

exports.getHome = async (req, res) => {
    try {
       console.log(`Hello from public route`)
       res.send('Hello from public route')
    } catch (error) {
        
    }
};

