const path = require('path');


const user = require("../routing/user");
const public = require("../routing/public");

const swaggerUI = require("swagger-ui-express")
const swaggerConfig = require("./swaggerConfig");



module.exports = (app, express) => {

  app.use("/users", user);
  app.use('/public', public)
  


   app.use('/api/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig.swaggerSpec, { explorer: true }))

  app.use(express.static('static'));
  app.use('*', (req, res) => res.sendFile(path.resolve(__dirname + '../../static/index.html')))
}