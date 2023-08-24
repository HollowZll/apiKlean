const mongoose  = require('mongoose');
const Koder = require('../models/koders.models');
const createError = require ('http-errors')

//get all
async function getAll() {
    const allKoders =  await Koder.find();
    return allKoders;
};
// create 
async function create (koderData) {
    // //save an object of koder to memory.
    // const newKoder = await new Koder(koderData);
    // // validation of koders, if an error we send it
    // const isValid = newKoder.validateSync();
    // //error validation and message; 
    // if(isValid) {
    //     throw new Error ("Invalid koder");
    // }
    // // save if the koder is valid
    // await newKoder.save();
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

    const koderUpdated = await Koder.findByIdAndUpdate(id, dataToUpdate);
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