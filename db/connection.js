const mongoose = require('mongoose')
require('dotenv').config()
const connectString = process.env.MONGODB_CONNECT_URI
mongoose.connect(connectString).then(() => {
    console.log("MongoDB Compass Connected");
}).catch((err) => {
    console.log(`MongoDB Failed ${err}`);
})

