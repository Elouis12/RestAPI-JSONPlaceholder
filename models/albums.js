let mongoose = require('mongoose');


let albumSchema = mongoose.Schema({

    userId: Number,
    id: Number,
    title: String

});

module.exports = mongoose.model('album', albumSchema);