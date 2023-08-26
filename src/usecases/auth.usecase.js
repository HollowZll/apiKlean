const Koder = require('../models/koders.models');
const createError = require('http-errors');
const bcrypt = require('../lib/bcrypt');
const { hash } = require('bcryptjs');

async function login (email, passwrord) {

    //check email
  const koder = await Koder.findOne({ email });

  if(!koder) {
    throw new createError(401, "Wrong information")
  };

   //check password 

  const isValidPassword = bcrypt.verify(koder.password, passwrord);

  if (!isValidPassword) {
    throw new createError(401, 'invalid data')
  };

  //generar token
}