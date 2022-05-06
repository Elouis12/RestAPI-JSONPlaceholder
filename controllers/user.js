const mongoose = require('mongoose');
const User = require('../models/users')
const Image = require('../models/images');
const images = require("../public/images/images");


const getUserInfo = async (req, resp) => {


    try{

        let users = await User.find();
        resp.status(200).json(users);

    }catch (e){

        resp.status(400).json(users);
        console.log(e);

    }

}



const postUserInfo = async (req, resp) => {

    let post = req.body; // gets all of the body

    let userAlreadyAdded = await User.findOne({email: req.body.email});

    if(  userAlreadyAdded != null/* || req.body.email === userAlreadyAdded.email*/ ){

        resp.status(202).json( { message : `USER ALREADY ADDED` } );
        return;

    }

    try{

        let createUser =  await new User({

            id : req.body.id,
            name : req.body.name,
            username : req.body.username,
            email : req.body.email,
            address : {

                street: req.body.address.street,
                suite: req.body.address.suite,
                city: req.body.address.city,
                zipcode: req.body.address.zipcode,
                geo: {

                    lat: req.body.address.geo.lat,
                    lng: req.body.address.geo.lng,
                },
            },
            phone: req.body.phone,
            website: req.body.website,
            company: {

                companyName: req.body.company.companyName,
                catchphrase: req.body.company.catchphrase,
                bs: req.body.company.bs
            },
            imageFile : images.arrayPictures[ req.body.id - 1 ]

        });

        await createUser.save( async () =>{

            let imageToSave = await new Image( { owner : createUser._id, imageFile : images.arrayPictures[ req.body.id - 1 ] /*+ req.body.name  */} ); // add image to is own db
            await imageToSave.save();

            // await User.findOneAndUpdate( { _id : createUser._id },  { $set : { imageFile : imageToSave.imageFile } }, { new: true } );
            // add the image property to

        } );
        resp.status(200).json(createUser);
        // console.log(`CREATED USER\n ${createUser}`);


    }catch (e){

        resp.status(400);
        console.log(e);

    }

}


const deleteUserInfo = async (req, resp) => {

    if( !mongoose.Types.ObjectId.isValid(req.params.id) ) return resp.status(404).send('INVALID ID');

    try{

        await User.findByIdAndRemove(req.params.id);
        await Image.deleteOne( { owner : req.params.id } ); // delete the image that belongs to it
        // await User.findByOneAndDelete(req.params.idToDelete);
        resp.status(200).json( await User.find() );
        console.log(`DELETED USER ${req.params.id}`);

    }catch (e){

        resp.status(400);
        console.log(e);

    }

}

module.exports = { getUserInfo, postUserInfo, deleteUserInfo };