const jwt = require('express-jwt');
const jwks = require('jwks-rsa')
const { auth } = require('express-oauth2-jwt-bearer');
const axios = require('axios')
const SECRET = 'victoriasecret';
const userManager = require('../managers/userManager')



exports.isAuthenticatedUser = (req, res, next) => {
    auth({
        audience: 'Backend of the react app created by Anastasia',
        issuerBaseURL: 'https://dev-4iiixb26jwhgzjy2.us.auth0.com/',
        tokenSigningAlg: 'RS256'
    })(req, res, next);
};


exports.authentication =  () => async  (req, res, next) => {
 
    //verifyJWT(req, res, next)
    let numberS = "-1"
    const index = req.rawHeaders.indexOf('authorization')
    console.log(index)

    if(index !== Number(numberS)) {
        const accessToken = req.headers['authorization'].split(' ')[1]
        if(accessToken){
            try {
                const response = await axios.get('https://dev-4iiixb26jwhgzjy2.us.auth0.com/userinfo', {
                    headers: {
                        authorization: `Bearer ${accessToken}`
                    }
                })
                console.log(accessToken)
                const userInfo = response.data
                console.log(userInfo)                 
            } catch (error) {
                console.log(error.message)
            }
        }
    }

    next();
};