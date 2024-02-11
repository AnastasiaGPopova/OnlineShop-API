const bcrypt = require("bcrypt");
const parser = require("../utils/parser");

const jwt = require("../lib/jsonwebtoken");
const User = require("../models/User");
const userPrefsManager = require('../managers/userPrefsManager')

const SECRET = "victoriasecret";

exports.login = async (email, password) => {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isValid = await user.validatePassword(password);

    if (!isValid) {
      throw new Error("Invalid password!");
    }

    const payLoad = { _id: user._id, email: user.email };
    const token = await jwt.sign(payLoad, SECRET);

    return {
      _id: user._id,
      email: user.email,
      accessToken: token,
    };
  } catch (error) {
    console.log(parser.parseError(error));
    return parser.parseError(error);
  }
};

exports.register = async (email, emailVerified) => {
  try {

    const newUser = await User.create({ email: email, emailVerified: emailVerified });
    const userPrefs = await userPrefsManager.createUserPrefs(newUser._id)
    newUser.save()

    return newUser


  } catch (error) {
    console.log(parser.parseError(error));
    return parser.parseError(error);
  }
};

exports.findUserByEmail = (email) => User.findOne({ email });
