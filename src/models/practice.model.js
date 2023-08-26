const mongoose = require('mongoose');
const practiceShema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    repo: {
        type: String,
        required: true,
        match: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/,
    },
    koder: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        trim: true,
        ref: 'koder'
    },
    created: {
        type: Date,
        required: true,
        default: new Date(),
    },

});

const PracticeModel = mongoose.model('practice', practiceShema);
module.exports =  PracticeModel;

// to use cases