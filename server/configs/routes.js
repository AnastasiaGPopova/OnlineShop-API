const path = require('path');


const user = require("../routing/user");
const public = require("../routing/public");
const protected = require("../routing/protected");

const swaggerUI = require("swagger-ui-express")
const swaggerConfig = require("./swaggerConfig");
const userManager = require('../managers/userManager')


module.exports = (app, express) => {
  app.get('api/auth/callback', async (req, res) => {
    console.log(`TEST`)
    try {
        // Extract user information from Auth0 callback query parameters
        const { sub, email, name, email_verified } = req.query;
        console.log(email)
  
        // Check if the user already exists in MongoDB
        const existingUser = await userManager.findUserByEmail(email)
  
        if (!existingUser) {
            // If user does not exist, create a new user record in MongoDB
            const newUser = await userManager.register(email, email_verified)
            console.log(newUser)
        }
  
        // Redirect the user to the dashboard or desired page
    } catch (error) {
        console.error('Error processing Auth0 callback:', error);
        res.status(500).send('Internal Server Error');
    }
  });
  app.use("/users", user);
  app.use('/public', public)
  app.use('/protected', protected)
  


   app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig.swaggerSpec, { explorer: true }))

  app.use(express.static('static'));
  app.use('*', (req, res) => res.sendFile(path.resolve(__dirname + '../../static/index.html')))
}