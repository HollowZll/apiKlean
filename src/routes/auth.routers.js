const express = require('express');
const router = express.Router();

router.post('/login', (request, response) => {
    try{
      
    } catch {
        response.status(500);
        response.json({
            message: 'something wrong',
            error: error.message
        })
    }
});

module.exports = router