const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const userPref = require('./UserPreferences');


const userSchema = new mongoose.Schema({
  prefId: {
    type: mongoose.Types.ObjectId,
    ref: 'userPref',
  },
  email: {
    type: String,
    required: true,
    //match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  // password: {
  //   type: String,
  //   required: true,
  //   match: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))^[^ ]+$/,
  //   minLength: [8, 'Password too short!!'],
  // },
  // firstName: {
  //   type: String,
  //   required: true,
  // },
  // lastName: {
  //   type: String,
  //   required: true,
  // },
  isLocked: {
    type: Boolean,
    default: false,
  },
  emailVerified: {
    type: Boolean,
  },
  closedAt: {
    type: Date,
    default:""
  },
  rolls: {
    type: [String],
    enum: ['USER', 'ADMINISTRATOR'],
    required: true,
    default: ['USER']
  }
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    next();
  });
});

userSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate(); // {password: "..."}
  if (update.password) {
    const passwordHash = await bcrypt.hash(update.password, 10);
    this.setUpdate({
      $set: {
        password: passwordHash,
      },
    });
  }
  next();
});

userSchema.method(
  'validatePassword',
  function (password) {
    return bcrypt.compare(password, this.password); //this.password is the encrypted password. Password is the password that the user is giving
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
