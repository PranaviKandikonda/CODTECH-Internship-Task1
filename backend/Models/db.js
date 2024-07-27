const mongoose = require("mongoose");

const DB_URL = process.env.MONGODB_URL;

mongoose.connect(DB_URL)
.then(() => {console.log("Connected to database")})
.catch((err) => {console.log("Error in connecting to the database", err)});