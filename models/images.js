let mongoose = require('mongoose');


let imageSchema = mongoose.Schema(

    {

        owner : {

            type : mongoose.Schema.Types.ObjectId,
            required: true,

        },

        imageFile : {

            type: String,
            // required: true,
        }

    }
);


module.exports = mongoose.model('image', imageSchema);