const express = require('express');
const router = express.Router();
const koders = require('../usecases/koders.usecase')

// List of koders using the Get method. 
router.get ('/', async (request, response) => {
    try{
    const allKoders =  await koders.getAll()
    response.json( {
        message: 'Koder list',
        data: {
            koders: allKoders,
        }
    });
} catch (error) {
    response.status(500);
    response.json({
        message: "Something is not working",
        error: error.message,
    })
}
});

// Create new koder try catch to find errors. 
router.post ('/', async (request, response) => {
    try{
    const koderData =  request.body;
    const newKoder =  await koders.create(koderData);
    response.status(201);
    response.json({
        message: 'Koder has been added',
        data: {
            koder: newKoder,
        }
    });
   } catch (error) {
        //to know if it's 500 or 400.
        const status = error.name === 'ValidationError' ? 400 : 500
        response.status(status);
        response.json({
            message: 'wrong',
            // .message enters the object property with just the general information about the error.
            error: error.message,
        })
    }
});


// find by ID
// /:id don't forget the route
router.get ('/:id', async(request, response) => {
   try {
    // to get from the url meaning :id
    const id = request.params.id;
    //use the function from usecases
    const koder = await koders.getById(id);
    response.json ( {
     message: `Koder ${id}`,
     data: { koder },
    });
} catch(error) {
    // error status takes it from usecases.
    response.status(error.status || 500);
    response.json({
        message: "oops",
        // enters the message property of the object error, which gives a lst of all the errors.
        error: error.message,
    })
}

});

router.delete ('/:id', async(request, response) => {
  try {
    const id = request.params.id;
    const koderDeleted = await koders.deleteById(id);
    response.json({
        message: 'Deleted',
        data: { 
            koder: koderDeleted },
    })
  } catch (error) {
    response.status(error.status || 500);
    response.json({
        message: "oops",
        error: error.message,
    })
  }
});


router.patch ('/:id', async(request, response) => {
    try {
       const { id } = request.params;
       const data = request.body;


       const koderUpdated = await koders.updateByID(id, data);

       response.json({
        message: "koder updated",
        data: {
            koder: koderUpdated,
        },
       })
    } catch (error) {
        response.status(error.status || 500);
        response.json({
            message: 'ooooooops',
            error: error.message,
        })
    }
})

module.exports = router;