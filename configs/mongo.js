require('dotenv').config();

const mongoose = require('mongoose');

async function startMongo() {
  return mongoose.connect(process.env.MONGO_CONNECTION_STRING);
}

module.exports = startMongo;
