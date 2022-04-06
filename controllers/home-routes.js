const router = require('express').Router();
const { User, Post, Comment, Save } = require('../models');

// render homepage
router.get('/', (req, res) => {
    console.log(req.session);

    res.render(
        'homepage',
        {
            loggedIn: req.session.loggedIn,
            username: req.session.username
        }
    );
});

// render sign-up page
router.get('/sign-up', (req, res) => {
    res.render('sign-up');
});

// render login page
router.get('/login', (req, res) => {
    // check for a session and redirect to the homepage if one exists
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// render all-posts page
router.get('/posts', (req, res) => {
    console.log(req.query);
    Post.findAll()
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
                    username: req.session.username
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
                attributes: ['id', 'username'],
            }
        ]
    })
    .then(postData => {
        const post = postData.get({ plain: true });
        let savedStatus = true;

        if (!req.session.loggedIn) {
            res.render('single-post', {
                post,
                loggedIn: req.session.loggedIn,
                username: req.session.username,
                notSaved: savedStatus
            });
        } else {
            if (post.user_id == req.session.user_id) {
                savedStatus = false;
            }
        
            Save.findAll({
                where: {
                    user_id: req.session.user_id
                }
            })
            .then(saveData => {
                const saveIDs = saveData.map(save => save.get({ plain: true }));

                // if post is already saved by current user, save btn doesn't display
                saveIDs.forEach(saveId => {
                    if (saveId.post_id == post.id) {
                        console.log(saveId);
                        console.log(post);
                        savedStatus = false;
                    }
                });
                res.render('single-post', {
                    post,
                    loggedIn: req.session.loggedIn,
                    username: req.session.username,
                    notSaved: savedStatus
                });
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
})

// render create-post page
router.get('/create', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render(
        'create-post',
        {
            loggedIn: req.session.loggedIn,
            username: req.session.username,
            createPost: true
        });
});

// render my-posts
router.get('/my-posts', (req, res) => {
    if (!req.session) {
        res.redirect('/');
        return;
    }

    // finds posts with user_ids matching current session's user_id
    const id = parseInt(req.session.user_id);
    Post.findAll({
        where: {
            user_id: id
        }
    })
    .then(postData => {
        const posts = postData.map(post => post.get({ plain: true }));
        res.render('my-posts',
            { 
                posts,
                loggedIn: req.session.loggedIn,
                username: req.session.username,
                myPosts: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// render saved-posts page
router.get('/saved-posts', (req, res) => {
    if (!req.session) {
        res.redirect('/');
        return;
    }

    // finds save data with user_id matching current session's user ID
    Save.findAll({
        where: {
            user_id: req.session.user_id
        },
        include: {
            model: Post
        }
    })
    .then(saveData => {
        const posts = saveData.map(save => save.get({ plain: true }));

        console.log("=========== savedPosts ===============");
        console.log(posts);
        res.render('saved-posts',
            { 
                posts,
                loggedIn: req.session.loggedIn,
                username: req.session.username,
                savedPosts: true
            });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;