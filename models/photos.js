let mongoose = require('mongoose');


let photoSchema = mongoose.Schema({

    albumId: 1,
    id: 1,
    title: String,
    url: String,
    thumbnailUrl: String/*https://via.placeholder.com/150/92c952*/

});

module.exports = mongoose.model('posts', photoSchema);