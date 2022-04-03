const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// render homepage
router.get('/', (req, res) => {
    console.log(req.session);
<<<<<<< HEAD
    res.render(
        'homepage',
=======
    res.render('homepage',
>>>>>>> dev/jess
        { loggedIn: req.session.loggedIn }
    )
});

// render login page
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login')
});

// render all posts page
router.get('/posts', (req, res) => {
    Post.findAll()
    .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
<<<<<<< HEAD
        res.render(
            'single-post',
=======
        res.render('all-posts',
>>>>>>> dev/jess
            {
                posts,
                loggedIn: req.session.loggedIn
            }
        )
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;