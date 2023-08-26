const mongoose = require('mongoose');
const kodersSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        trim: true,
    },
    program: {
        type: String,
        enum:  ['javascript' , 'python', 'ios'],  // case sensitive
        required: true,
        trim: true,
    },
    email: {
        type: String,
        match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true, 
        required: true,
    },
    created: {
        type: Date,
        required: true,
        default: new Date(),
    }

});


const KoderModel = mongoose.model('koder', kodersSchema);

module.exports = KoderModel;

//to usecases