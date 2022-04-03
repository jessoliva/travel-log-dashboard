const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// render homepage
router.get('/', (req, res) => {
    console.log(req.session);
    res.render(
        // homepage filename
        { loggedIn: req.session.loggedIn }
    )
});

// render login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render(
        // login filename
    )
});

// render all posts page
router.get('/posts', (req, res) => {
    Post.findAll()
    .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render(
            // all-posts filename
            {
                posts,
                loggedIn: req.sessiojn.loggedIn
            }
        )
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;