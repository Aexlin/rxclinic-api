//* RXCLINIC API

//* import modules
const express = require("express");
const dotenv = require("dotenv");
const db = require("./src/models");

//* initialize app 
var app = express();

//* parse requests of content-type - application/json
app.use(express.json());

//* parse requests of content-type - application/x-www-form-urlencoded
app.use(
    express.urlencoded({
        extended: true,
    }));

//* get config from .env file
dotenv.config();

db.sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}).catch(err => {
    console.error("Unable to connect to the database:", err);
});

//* middleware
app.use((req, res, next) => {
    //* you can check session here
    console.log("Request Has Been Sent to " + req.url);
    next();
});

app.get('/', (req, res) => {
    res.json({ message: "Hello Hatdog!" });
});

app.get('/welcome', (req, res) => {
    res.json({ message: "Hello World!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});