let mongoose = require('mongoose');


let todoSchema = mongoose.Schema({

    userId: Number,
    id: Number,
    title: String,
    completed: false

});


module.exports = mongoose.model('todo', todoSchema);