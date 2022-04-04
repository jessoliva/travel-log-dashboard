const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// render homepage
router.get('/', (req, res) => {
    console.log(req.session);
    res.render(
        'homepage',
        { loggedIn: req.session.loggedIn }
    );
});

// render sign-up page
router.get('/sign-up', (req, res) => {
    res.render('sign-up',);
});

// render login page
router.get('/login', (req, res) => {
    // check for a session and redirect to the homepage if one exists
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login',);
});

// render all posts page
router.get('/posts', (req, res) => {
    Post.findAll()
    .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('all-posts', { posts })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// render single-post page
router.get('/posts/:id', (req, res) => {
    Post.findOne()
    .then(postData => {
        const post = postData.get({ plain: true });
        res.render('single-post', { post });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// render create-post page
router.get('/create', (req, res) => {
    // if (!req.session.loggedIn) {
    //     res.redirect('/');
    //     return;
    // }

    res.render('create-post', { loggedIn: req.session.loggedIn });
});

module.exports = router;