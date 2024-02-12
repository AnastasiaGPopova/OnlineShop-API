const path = require('path');
const axios = require('axios')
const crypto = require('crypto')

const user = require("../routing/user");
const public = require("../routing/public");
const protected = require("../routing/protected");

const swaggerUI = require("swagger-ui-express")
const swaggerConfig = require("./swaggerConfig");
const userManager = require('../managers/userManager')

function base64URLEncode(str) {
  return str.toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
}

module.exports = (app, express) => {
  app.get('/auth/callback', async (req, res) => {
    console.log(`TESTSSSS`)
    console.log(req)
    const { code } = req.query;
    const { state } = req.query

    console.log(`CODE ${code}`)
    console.log(`STATE ${state}`)

  
    // Exchange authorization code for access token
    try {

      var options = {
        method: 'POST',
        url: 'https://dev-4iiixb26jwhgzjy2.us.auth0.com/oauth/token',
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        data: new URLSearchParams({
          grant_type: 'authorization_code',
          client_id: 'WznJjzPhrt57lOCO2KUGc8tIybooquyl',
          client_secret: '4gtHoTXmtTaZh1aMzcQMWUeTecKT-dlSfHhNZcTnnlqhghRKO8raNcUmMzVuyuC2',
          code,
          redirect_uri: 'http://localhost:5050/auth/callback'
        })
      };

      axios.request(options).then(function (response) {
        console.log(response.data);
      }).catch(function (error) {
        console.error(error);
      });


      // Retrieve user profile using access token
      // const profileResponse = await axios.get('https://dev-4iiixb26jwhgzjy2.us.auth0.com/userinfo', {
      //     headers: {
      //         Authorization: `Bearer ${access_token}`
      //     }
      // });

      // const { sub, email, name } = profileResponse.data;
      // console.log(email)

  
      res.send('Authorization code exchanged for access token');
    } catch (error) {
      //console.error('Error exchanging authorization code for access token:', error);
      res.status(500).send('Internal server error');
    }
  });
  app.use("/users", user);
  app.use('/public', public)
  app.use('/protected', protected)
  


   app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerConfig.swaggerSpec, { explorer: true }))

  app.use(express.static('static'));
  app.use('*', (req, res) => res.sendFile(path.resolve(__dirname + '../../static/index.html')))
}