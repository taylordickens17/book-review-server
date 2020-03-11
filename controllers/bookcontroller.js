var express = require('express');
var router = express.Router();
var sequelize = require('../db');
var Log = sequelize.import('../models/books');

//ALL CONNECTED TO THE /AUTH
//POST CREATE LOG
router.post('/create/log', function (req, res) {
    var owner = req.user.id
    var title = req.body.title;
    var author = req.body.author;
    var genre = req.body.genre;
    var rating = req.body.rating;
    var description = req.body.description;
    var review = req.body.review;

    Log.create({
        owner: owner,
        title: title,
        author: author,
        genre: genre,
        rating: rating,
        description: description,
        review: review
    })
        .then(data => res.status(200).json(data))
        .catch(err => res.json({ error: err }))
});

//GET ALL LOG
router.get('/all/log', function (req, res) {
    const userid = req.user.id

    Log.findAll({
        where: { owner: userid }
    }).then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});

//GET A SPECIFIC LOG
router.get('/one/log/:id', function (req, res) {
    var data = req.params.id;
    var userid = req.user.id;

    Log.findOne({
        where: { id: data, owner: userid }
    }).then(
        function findOneSuccess(data) {
            res.json(data);
        },
        function findOneError(err) {
            res.send(500, err.message)
        }
    );
});

//PUT SPECIFIC LOG BUT UPDATE
router.put('/update/:id', function (req, res) {
    var data = req.params.id;
    var userid = req.user.id;
    var title = req.body.title;
    var author = req.body.author;
    var genre = req.body.genre;
    var rating = req.body.rating;
    var description = req.body.description;
    var review = req.body.review;

    Log.update({
        title: title,
        author: author,
        genre: genre,
        rating: rating,
        description: description,
        review: review
    }, {
        where: {
            id: data,
            owner: userid
        }
    })

        .then(
            function updateSuccess(updatedLog) {
                res.json({
                    updatedLog
                });
            },
            function updateError(err) {
                res.send(500, err.message);
            }
        )
    console.log(req.user.id)
    console.log(req.params.id);
})

//DELETE LOG
router.delete('/delete/:id', function (req, res) {
    var data = req.params.id;
    var userid = req.user.id;

    Log.destroy({
        where: { id: data, owner: userid }
    }).then(
        function deleteLogSuccess(data) {
            res.send("You removed a book.");
        },
        function deleteLogError(err) {
            res.send(500, err.message);
        }
    );
});

module.exports = router;