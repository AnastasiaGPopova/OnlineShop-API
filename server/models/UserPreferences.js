const mongoose = require('mongoose');



const userPreferencesSchema = new mongoose.Schema({
  _ownerId: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
});

const userPref = new mongoose.model('userPref', userPreferencesSchema);

module.exports = userPref;
