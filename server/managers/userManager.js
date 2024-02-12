const bcrypt = require("bcrypt");
const parser = require("../utils/parser");

const jwt = require("../lib/jsonwebtoken");
const User = require("../models/User");
const userPrefsManager = require('../managers/userPrefsManager')

const SECRET = "victoriasecret";

exports.login = async (email, password) => {

};

exports.register = async (email, emailVerified, authid) => {
  try {

    const newUser = await User.create({ email: email, emailVerified: emailVerified, authId: authid });
    const userPrefs = await userPrefsManager.createUserPrefs(newUser._id)
    newUser.save()

    return newUser


  } catch (error) {
    console.log(parser.parseError(error));
    return parser.parseError(error);
  }
};

exports.findUserByEmail = (email) => User.findOne({ email });
