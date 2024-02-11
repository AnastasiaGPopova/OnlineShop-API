const router = require('express').Router()
const parser = require('../utils/parser')

const userManager = require('../managers/userManager');

exports.getHome = async (req, res) => {
    console.log(`Hello from public route`)
};

