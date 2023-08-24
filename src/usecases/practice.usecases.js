const mongoose = require('mongoose');
const Practice = require('../models/practice.model');
const createError = require ('http-errors');

// get all 
async function getAllPractice() {
    const allPractice = await Practice.findOne(); 
};

// create 

async function createProgram (practiceData) {
    const newPractice = await Practice.create(practiceData);
    return newPractice;
}

// find by id 

async function getById (id) {
    if (!mongoose.isValidObjectId(id)) {
        throw new createError(400, 'Invalid ID');
    }
    const practica = await Practice.findById(id);
    return practica;
}


// delete by ID 

async function deleteByID (id) {
    if (!mongoose.isValidObjectId(id)) {
        throw new createError(400, 'invalid id')
    }
    const practicaDeleted = await Practice.findByIdAndDelete(id);
    if (!practicaDeleted) {
        throw new createError(404, 'Practica not found');
    }
    return practicaDeleted;
}


// update 

async function updateByID(id, dataToUpdate) {
    if (!mongoose.isValidObjectId(id)) {
        throw new createError(400, 'Invalid ID');

    };
    const practicaUpdated = await Practice.findByIdAndUpdate(id, dataToUpdate);
    if (!practicaUpdated) {
        throw new createError (404, 'Invalit info')
    };
    return practicaUpdated;
}



module.exports = {
    getAllPractice,
    createProgram,
    getById,
    deleteByID,
    updateByID,
}