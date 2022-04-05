const router = require('express').Router();
const { User, Post, Comment } = require('../models');

// render homepage
router.get('/', (req, res) => {
    console.log(req.session);
    res.render(
        'homepage',
        {
            loggedIn: req.session.loggedIn,
            createPost: true,
            savedPosts: true,
            myPosts: true
        }
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

    res.render('login', { home: true });
});

// render all posts page
router.get('/posts', (req, res) => {
    console.log(req.query);
    Post.findAll({})
        .then(postData => {
            const posts = postData.map(post => post.get({ plain: true }));
            let filterResults = posts;
            if (req.query.city) {
                filterResults = filterResults.filter(post => post.city.toLowerCase() == req.query.city);
            }
            if (req.query.country) {
                filterResults = filterResults.filter(post => post.country.toLowerCase() == req.query.country);
            };

            res.render(
                'all-posts',
                {
                    filterResults,
                    loggedIn: req.session.loggedIn,
                    home: true,
                    createPost: true,
                    savedPosts: true,
                    myPosts: true
                })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// render single-post page
router.get('/posts/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        // attributes: [
        //     'id',
        //     'title'
        // ]
        include: [
            {
                model: Comment,
                attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(postData => {
            const post = postData.get({ plain: true });
            console.log(post);
            res.render('single-post', { post, loggedIn: req.session.loggedIn, home: true });
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

    res.render(
        'create-post',
        {
            loggedIn: req.session.loggedIn,
            home: true,
            savedPosts: true,
            myPosts: true

        });
});

module.exports = router;