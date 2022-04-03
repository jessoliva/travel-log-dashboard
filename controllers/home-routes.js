const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// render homepage
router.get('/', (req, res) => {
    console.log(req.session);
    res.render(
        // homepage filename
        {
        loggedIn: req.session.loggedIn
        }
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

module.exports = router;