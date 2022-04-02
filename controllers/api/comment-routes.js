const router = require('express').Router();
const { Comment, Post, User } = require('../../models');

// GET all comments
router.get('/', (req, res) => {
    Comment.findAll()
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// GET single comment
router.get('/:id', (req, res) => {
    Comment.findAll({
        where: {
            id: req.params.id
        }
    })
    .then(commentData => {
        if (!commentData) {
            res.status(404).json({
                message: "No comment found with that ID."
            });
            return;
        }
        res.json(commentData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// CREATE a comment
router.post('/', (req, res) => {
    Comment.create({
        text: req.body.text,
        post_id: req.body.post_id,
        user_id: req.session.user_id
    })
    .then(commentData => res.json(commentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err)
    });
});

// UPDATE a comment
router.put('/:id', (req, res) => {
    Comment.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(commentData => {
        if (!commentData) {
            res.status(404).json({
                message: "No comment found with that ID."
            });
            return;
        }
        res.json(commentData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// DELETE a comment
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(commentData => {
        if (!commentData) {
            res.status(404).json({
                message: "No comment found with that ID."
            });
            return;
        }
        res.json(commentData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

module.exports = router;