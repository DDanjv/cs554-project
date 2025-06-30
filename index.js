const express = require("express");
const app = express ( ) ;
const path = require('path');
const mongoose = require('mongoose');
const { error } = require("console");
require('dotenv').config();
const userRoutes = require('./server/routes/user');
const postRoutes = require('./server/routes/post');
const followRoutes = require('./server/routes/follow');

console.log(process.env.dbURL);
mongoose.connect(process.env.dbURL)
    .then(console.log("MongoDB connected"))
    .catch(error => console.log(error));

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type,Accept,Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next ();
});

app.use('/user', userRoutes);
app.use('/post', postRoutes);
app.use('/follow', followRoutes);

app.use(express.static(__dirname + "/public"));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/public', 'index.html')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));

    