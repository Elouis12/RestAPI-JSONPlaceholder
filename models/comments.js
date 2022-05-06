let mongoose = require('mongoose');


let commentSchema = mongoose.Schema({

    postId: Number,
    id: Number,
    name: String,
    email: String,
    body: String

});

module.exports = mongoose.model('comments', commentSchema);