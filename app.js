require('dotenv').config();

//EXPRESS
var express = require('express');
var app = express();

//CONTROLLER IMPORTS
var test = require('./controllers/bookcontroller');
var user = require('./controllers/usercontroller');

//SEQUELIZES TO THE DB
var sequelize = require('./db');

//SENDS EVERYTHING TO THE DB. FORCE TRUE RESETS THE TABLE.
sequelize.sync();
// sequelize.sync({ force: true });
app.use(express.json())

//MIDDLEWARE
app.use(require('./middleware/headers'));

//CONNECTS USERCONTROLLER.JS "EXPOSED ROUTE"
app.use('/user', user);

//PROTECTED ROUTE
app.use(require('./middleware/validate-session'));
app.use('/auth', test)

app.listen(process.env.PORT, () => console.log(`app is listening on ${process.env.PORT}`));