const Sequelize = require('sequelize');

const sequelize = new Sequelize('zebookreviewapp', 'postgres', 'RainbowBrite55!', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function () {
        console.log('Connected to zebookreviewapp postgres database');
    },
    function (err) {
        console.log(err);
    }
);

module.exports = sequelize;