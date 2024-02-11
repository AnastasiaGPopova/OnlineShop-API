const path = require('path');


const user = require("../routing/user");
const public = require("../routing/public");
const protected = require("../routing/protected");

const swaggerUI = require("swagger-ui-express")
const swaggerConfig = require("./swaggerConfig");



module.exports = (app, express) => {

  app.use("/users", user);
  app.use('/public', public)
  app.use('/protected', protected)
  


   app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig.swaggerSpec, { explorer: true }))

  app.use(express.static('static'));
  app.use('*', (req, res) => res.sendFile(path.resolve(__dirname + '../../static/index.html')))
}