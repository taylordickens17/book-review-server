require('dotenv').config();

//EXPRESS
const express = require('express');
const app = express();

//CONTROLLER IMPORTS
const user = require('./controllers/usercontroller');
const book = require('./controllers/bookcontroller');

//SEQUELIZES TO THE DB
const sequelize = require('./db');

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
app.use('/book', book);

app.listen(process.env.PORT, () => console.log(`app is listening on ${process.env.PORT}`));