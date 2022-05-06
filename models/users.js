let mongoose = require('mongoose');


let userSchema = mongoose.Schema(

    {

        id : {

            type: Number,
            required: true,
        },
        name : String,
        username : String,
        email : String,
        address : {

            street: String,
            suite: String,
            city: String,
            zipcode: String,
            geo: {

                lat: Number,
                lng: Number,
            },
        },
        phone: String,
        website: String,
        company: {

            companyName: String,
            catchphrase: String,
            bs: String
        },
        imageFile : {

            type : String,
        },
        createdAt : {

            type : Date,
            default : new Date( Date.now() )
        },




    }
);


module.exports = mongoose.model('user', userSchema);