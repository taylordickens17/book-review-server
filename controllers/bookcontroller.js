const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const Books = sequelize.import('../models/books');

//POST CREATE BOOK
router.post('/create', (req, res) => {
    const booksFromRequest = {
        userId: req.user.id,
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        rating: req.body.rating,
        description: req.body.description,
        review: req.body.review,
    }
    Books.create(booksFromRequest)
        .then(data => res.status(200).json(data))
        .catch(err => res.status(500).json({
            error: err
        }))
});

//GET ALL BOOKS EVERY LAST ONE
router.get('/allbooks', (req, res) => {
    Books.findAll()

        .then(book => res.status(200).json(book))
        .catch(err => res.status(500).json({
            error: err
        })
        );
});

//GET A SPECIFIC BOOK
router.get('/find', (req, res) => {
    Books.findAll({
        where: { userId: req.user.id }
    })
        .then(books => res.status(200).json(books))
        .catch(err => res.status(500).json({
            error: err
        }))
});

//PUT SPECIFIC LOG BUT UPDATE
router.put('/update/:id', (req, res) => {
    Books.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(books => res.status(200).json(books))
        .catch(err => res.json(res.errors))
})

//DELETE LOG
router.delete('/delete/:id', (req, res) => {
    Books.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(books => res.status(200).json(books))
        .catch(err => res.json({
            error: err
        }))
})

module.exports = router;