var router = require('express').Router();
var User = require('../db').import('../models/user');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var sequelize = require('../db');
var Log = sequelize.import('../models/books');

//GET ALL BOOKS EVERY LAST ONE
router.get('/allbooks', (req, res) => {
    Log.findAll()
        .then(function findAllSuccess(data) {
            res.json(data);
        })
        .catch(err => res.status(500).json({
            error: err
        }))
})

//POST SIGNUP
router.post('/signup', function (req, res) {
    const username = req.body.user.username;
    const pass = req.body.user.password;

    User.create({
        username: username,
        password: bcrypt.hashSync(pass, 10)
    }).then(
        function createSuccess(user) {

            var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });

            res.json({
                user: user,
                message: 'signed up',
                sessionToken: token
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }
    );
});

//POST LOGIN
router.post('/login', function (req, res) {
    User.findOne({ where: { username: req.body.user.username } }).then(
        function (user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.password, function (err, matches) {
                    if (matches) {
                        var token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 });
                        res.json({
                            user: user,
                            message: "Successfully logged in",
                            sessionToken: token
                        });
                    } else {
                        res.status(502).send({ error: "You failed to login." });
                    }
                });
            } else {
                res.status(500).send({ error: "You failed to authenticate." });
            }
        },
        function (err) {
            res.status(501).send({ error: "You failed to login." });
        }
    );
});

module.exports = router;