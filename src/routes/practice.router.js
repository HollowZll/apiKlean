const express = require('express');
const pRouter = express.Router();
const practices = require('../usecases/practice.usecases')
const Koder = require('../models/koders.models');


//list all
pRouter.get ('/', async (request, response) => {
    try {
      const allPrograms = await practices.getAllPractice();
      response.json({
        message: 'Practices list',
        data: {
            practices: allPrograms,
        }
      })
    } catch (error) {
        response.status(500)
        response.json({
            message: "Oops",
            error: error.message,
        })
    }
});

// create a new koder

pRouter.post ('/', async (request, response) => {
    try{
      const practiceData = request.body;
      const newPractice = await practices.createProgram(practiceData);
      response.status(201);
      response.json({
        message: 'Practica agregada',
        data: {
          practica: newPractice,
        }
      });
      // validar que id del koder si existe
    } catch (error) {
        const status = error.name === 'ValidationError' ? 400 : 500
        response.status(error.status || status);
        response.json({
            message: 'Double oops',
            error: error.message,
        });

        // validart que el koder existe

        if (!koder) {
            throw new createError(404, 'Koder Not Found')
        }
    }
});


// find by id 

pRouter.get ('/:id', async (request, response) => {
    try {
      const id = request.params.id;
      const practica = await practices.getById(id);
      response.json ({
        message: `Practica ${id}`,
        data: { practica }
      })
    } catch(error) {
        response.status(error.status || 500);
        response.json({
            message: "oopsie doopsie",
           error: error.message,
        })
    }
})

//delete by id 

pRouter.delete (':/id', async (request, response) => {
    try {
     const id = request.params.id;
     const practicaDeleted = await practices.deleteByID(id);
     response.json ({
        message: 'Deleted',
        data: {
            practica: practicaDeleted,
        }
     })
    } catch(error) {
        response.status(error.status || 500);
        response.json({
            message: "oops triple",
            error: error.message,
        })
    }
});


// update by ID 

pRouter.patch ('/:id', async (request, response) => {
    try {
     const { id } = request.params;
     const data = request.body;


     const practicaUpdated = await practices.updateByID(id, data);
    } catch(error) {
        response.status(error.status || 500);
        response.json({
            message: "last oops",
            error: error.message,
        })
    }
})

module.exports = pRouter;