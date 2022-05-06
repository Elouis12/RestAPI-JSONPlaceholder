let mongoose = require('mongoose');


let postSchema = mongoose.Schema({

    userId: Number,
    id: Number,
    title: String,
    body: String
});

module.exports = mongoose.model('posts', postSchema);