const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
});

sequelize.authenticate()
    .then(() => console.log('database is connected'))
    .catch((err => console.log(err)));

User = sequelize.import('./models/user');
Books = sequelize.import('./models/books');

Books.belongsTo(User);
User.hasMany(Books);

module.exports = sequelize;