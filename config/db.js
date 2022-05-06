let mongoose = require('mongoose');

let connectDB = async ()=>{

    try{

        const connect = await mongoose.connect( process.env.DB_CONNECTION );
        console.log( `DATA BASE CONNECTED :  ${ connect.connection.host }`);

    }catch (e) {

        console.log( e );
        process.exit(1);

    }

}

module.exports = { connectDB }