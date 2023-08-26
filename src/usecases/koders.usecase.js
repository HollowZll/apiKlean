const mongoose  = require('mongoose');
const Koder = require('../models/koders.models');
const createError = require ('http-errors')
const bcrypt = require ('../lib/bcrypt');

//get all
async function getAll(tittleFilter) {
    const allKoders =  await Koder.find()
    return allKoders;
};

// CREATE 
async function create (koderData) {
    // validar si el koder ya existe 
    const existingKoder = await Koder.findOne ({ email: koderData.email });
    if (existingKoder) {
        throw new createError(412, 'Email ya usado')
    };
    //validar the password (weak)
    const passwordRegex = new RegExp(
        "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$"
    );
    if (!passwordRegex.test(koderData.password)) {
        throw new createError(400, 'Password to weak')
    }

    // guardar password encriptado 1. koderdata accedimos a password usamos funcion encrypt, to finish it. 
     
    koderData.password = bcrypt.encrypt(koderData.password)

    const newKoder = await Koder.create(koderData);
    return newKoder;
};
// find by id
async function getById (id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, 'Invalid ID');
  }
  const koder = await Koder.findById(id);
  return koder;
};

//delete by ID
async function deleteById(id) {
    if (!mongoose.isValidObjectId(id)) {
        throw new createError(400, 'Invalid ID');
    }
    const koderDeleted = await Koder.findByIdAndDelete(id);
    if (!koderDeleted) {
        throw new createError(404, 'Koder not found');
    }
    return koderDeleted;
};


async function updateByID(id, dataToUpdate) {
    if (!mongoose.isValidObjectId(id)) {
        throw new createError(400, 'Invalid ID');
    };

    const koderUpdated = await Koder.findByIdAndUpdate(id, dataToUpdate, {
        new: true,
        runValidators: true
    });
    if (!koderUpdated){
        throw  new createError(404, 'Invalid info or koder not found');
    }
    
    return koderUpdated;
}

module.exports = {
    getAll,
    create,
    getById,
    deleteById,
    updateByID,
}