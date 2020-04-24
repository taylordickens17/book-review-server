const router = require('express').Router();
const User = require('../db').import('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//USER SIGNUP
router.post('/signup', (req, res) => {

    User.create({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10)
    }).then(
        createSuccess = (user) => {

            let token = jwt.sign({
                id: user.id
            }, process.env.JWT_SECRET, {
                expiresIn: 60 * 60 * 24
            });
            res.json({
                user: user,
                message: 'signed up',
                sessionToken: token
            });
        },
        createError = err => {
            console.log('hello', err);
            res.send(500, err);
        }
    );
});

//USER LOGIN
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, matches) => {
                if (matches) {
                    let token = jwt.sign({
                        id: user.id
                    }, process.env.JWT_SECRET, {
                        expiresIn: 60 * 60 * 24
                    });
                    res.json({
                        user: user,
                        message: "Successfully logged in",
                        sessionToken: token
                    });
                } else {
                    res.status(502).send({
                        error: "You failed to login."
                    })
                }
            });
        } else {
            res.status(500).send({
                error: "You failed to authenticate."
            })
        }
    }, err => {
        status(501).send({
            error: "You failed to login."
        });
    }
    );
});

module.exports = router;