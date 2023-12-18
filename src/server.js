import express from "express";
import initPublicWebRoutes from "./route/index.js";
import initAdminWebRoutes from "./route/admin.js"
import configViewEngine from "./config/viewEngine.js";
import bodyParser from "body-parser";
require("dotenv").config();
// const mysql2 = require("mysql2");
const { Pool } = require('pg');
const { Client } = require('pg');
const cookieParser = require('cookie-parser');
const fs = require('file-system');

var session = require("express-session");

let app = express();

// const connection = mysql2.createPool({
//     host: 'sql12.freesqldatabase.com',
//     user: 'sql12668865',
//     password: 'bqcQkn9eAm',
//     database: 'sql12668865',
//     port: 3306
// });

const connection = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

// const connection = new Pool(process.env.DATABASE_URL);

app.use(function(req, res, next) {
    req.pool = connection;
    next(); 
});

app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: 'loveurlife',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

configViewEngine(app);
initPublicWebRoutes(app);
initAdminWebRoutes(app);


let port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log("Running on port: " + port);
});