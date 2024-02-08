const mongoose = require('mongoose');
const countryAndTime = require('../util/contriesTimeZones.js')


const userPreferencesSchema = new mongoose.Schema({
  _ownerId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
});

const userPref = new mongoose.model('userPref', userPreferencesSchema);

module.exports = userPref;
