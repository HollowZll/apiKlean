const mongoose = require('mongoose');
const Practice = require('../models/practice.model');
const createError = require ('http-errors');
const Koder = require ('../models/koders.models')

// get all 
async function getAllPractice() {
    //populate makes reference to the model shceme part ref
    const allPractice = await Practice.find().populate('koder'); 
    return allPractice;
};

// create 

async function createProgram (practiceData) {
    const newPractice = await Practice.create(practiceData);
    if(!mongoose.isValidObjectId(practiceData.koder)) {
        throw new createError(400, 'Invalid koder ID')
    };
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

    if (dataToUpdate.koder) {
        if(!mongoose.isValidObjectId(dataToUpdate.koder)) {
            throw new createError(400, 'Invalid koder ID')
        }
        const koder = await Koder.findById(dataToUpdate.koder);
        if (!koder) {
            throw new createError(404, "Koder not found")
        }
    }
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