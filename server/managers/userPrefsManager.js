
const UserPreferences = require("../models/UserPreferences");

exports.createUserPrefs = (userId) => UserPreferences.create({"_ownerId": userId})
