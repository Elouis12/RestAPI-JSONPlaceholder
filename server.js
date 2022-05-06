let express = require('express');
let app = express();
require("dotenv").config()
let { connectDB } = require('./config/db');
let cors = require('cors');

/*app.use( express.urlencoded({ extended : false } ) )
app.use( express.json() )*/
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use( cors() );




let usersRoutes = require('./routes/router');
app.use('/', usersRoutes);








app.listen(process.env.PORT, async ()=>{

    console.log('server is running');
    await connectDB();
})