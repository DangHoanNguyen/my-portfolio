import express from "express";
import initPublicWebRoutes from "./route/index.js";
import initAdminWebRoutes from "./route/admin.js"
import configViewEngine from "./config/viewEngine.js";
import bodyParser from "body-parser";
require("dotenv").config();
const mysql = require("mysql")

let app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'mydata'
});

connection.connect();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

configViewEngine(app);
initPublicWebRoutes(app);
initAdminWebRoutes(app);


let port = process.env.PORT || 8081;
app.listen(port, () => {
    console.log("Running on port: " + port);
});