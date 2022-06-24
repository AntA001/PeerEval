//For Database
require("dotenv").config();
require("./config/database").connect();
var cors = require('cors');

//For session
const express = require("express");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const app = express();

//For Static files or Path
var path = require("path");
app.set('views', path.join(__dirname, 'views'));
app.use(express.static( path.join(__dirname, 'public') ))

//For Get route data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Set Session config
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: parseInt( process.env.SESSION_TIME ) },
    resave: true,
    saveUninitialized: true
}));

app.use(cors());
app.options('*', cors());
app.use(
  cors({
    origin: ["http://localhost*"]
  })
); 
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Include all routes
const apiRouter = require("./router/api");
app.use( apiRouter );


module.exports = app;