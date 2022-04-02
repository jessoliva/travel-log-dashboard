const router = require('express').Router();
const { Post, User } = require('../../models');

// GET all posts
router.get('/', (req, res) => {
    Post.findAll()
    .then(postData => res.json(postData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// GET single post
router.get('/:id', (req, res) => {
    Post.findAll({
        where: {
            id: req.params.id
        }
    })
    .then(postData => {
        if (!postData) {
            res.status(404).json({
                message: "No post found with that ID."
            });
            return;
        }
        res.json(postData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// CREATE a post
router.post('/', (req, res) => {
    Post.create({

    })
    .then(newPostData => {
        
    })
});