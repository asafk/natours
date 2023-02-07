const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// name, email, photo, password, passwordConfirm
const userScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide valid email!'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm yor password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Password are not the same!',
    },
  },
});

userScheme.pre('save', async function (next) {
  // Only run this func if password was actually modified
  if (!this.isModified('password')) return next();

  // Has the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // not need to presisted it, delete password confirm fiels
  this.passwordConfirm = undefined;
  next();
});

const User = mongoose.model('User', userScheme);
module.exports = User;
