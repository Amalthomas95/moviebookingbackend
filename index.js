
require('dotenv').config()

const express = require('express')
const cors=require('cors')
const router = require('./routes/routes')
require('./db/connection')

const Movies = express()

Movies.use(express.json())
Movies.use(cors())
Movies.use(router)

const PORT = 4004 || process.env.PORT
Movies.listen(PORT, () => {
    console.log(`Movies  started at ${PORT}`);
})