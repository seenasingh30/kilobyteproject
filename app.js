var express = require('express');
var app = express();
var dotenv = require("dotenv");
dotenv.config({ path: './.env' });
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
require('./routes/index.js')(app);
try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        process.env.mongoose, { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log("Mongoose is connected"),
    );
} catch (e) {
    console.log("could not connect");
}
const dbConnection = mongoose.connection;
dbConnection.on("error", (err) => console.log(`Connection error ${err}`));
dbConnection.once("open", () => console.log("Connected to DB!"));
app.listen(3000, function() {
    console.log('App running on port 3000!');
});