const express = require('express');
const cors = require('cors');


const { authentication } = require('./middlewares/authMiddleware');
const router = require("./configs/routes")
const startMongo = require('./configs/mongo');
const app = express();


start();

async function start() {
  await startMongo();

  app.use(cors());
  app.use(express.urlencoded({extended: false}));
  app.use(express.json());
  app.use(authentication());
  
  router(app, express)

  app.listen(process.env.PORT, () => {
    console.log(`Server listening on port ${process.env.PORT}`);
  });
}
