const path = require('path');


const user = require("../routing/user");
//const subUser = require("../routing/subUser");
// const organisation = require("../routing/organisation");
// const invoice = require("../routing/invoice");
// const client = require("../routing/client");

const swaggerUI = require("swagger-ui-express")
const swaggerConfig = require("./swaggerConfig");



module.exports = (app, express) => {

  app.use("/api/users", user);
//   app.use("/api/auth", auth);
//   app.use("/api/subUsers", subUser);

//   app.use("/api/org", organisation);
//   app.use("/api/invoice", isModuleEnabled("invoices"), invoice);
//   app.use("/api/client", isModuleEnabled("clientDashboard"), client);

   app.use('/api/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig.swaggerSpec, { explorer: true }))

  app.use(express.static('static'));
  app.use('*', (req, res) => res.sendFile(path.resolve(__dirname + '../../static/index.html')))
}