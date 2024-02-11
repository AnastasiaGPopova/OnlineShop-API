const jwt = require('express-jwt');
const jwks = require('jwks-rsa')
const { auth } = require('express-oauth2-jwt-bearer');
const axios = require('axios')
const SECRET = 'victoriasecret';


const verifyJWT = auth({
    audience: 'Backend of the react app created by Anastasia',
    issuerBaseURL: 'https://dev-4iiixb26jwhgzjy2.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  })

exports.authentication =  () => async (req, res, next) => {
 
    verifyJWT(req, res, next)
    const accessToken = req.headers['x-authorization'].split(' ')[1]
    const response = await axios.get('https://dev-4iiixb26jwhgzjy2.us.auth0.com/userinfo', {
        headers: {
            authorization: `Bearer ${accessToken}`
        }
    })
    console.log(accessToken)
    const userInfo = response.data
    console.log(userInfo)

    next();
};