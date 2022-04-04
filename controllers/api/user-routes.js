const router = require('express').Router();
const { User } = require('../../models');

// GET all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: {
            exclude: ['password']
        }
    })
        .then(userData => res.json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

// GET single user
router.get('/:id', (req, res) => {
    User.findAll({
        where: {
            id: req.params.id
        },
        attributes: {
            exclude: ['password']
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({
                    message: "No user found with that ID."
                });
                return;
            }
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

// CREATE a user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(newUserData => {
            req.session.save(() => {
                req.session.user_id = newUserData.id;
                req.session.username = newUserData.username;
                req.session.loggedIn = true;

                res.json(newUserData);
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

// LOGIN a user
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(400).json({ message: "No user with that email address." });
                return;
            }

            // checks if password input matches user's password
            const validPw = userData.pwCheck(req.body.password);

            if (!validPw) {
                res.status(400).json({ message: "Incorrect password." });
                return;
            }

            req.session.save(() => {
                req.session.user_id = userData.id;
                req.session.username = userData.username;
                req.session.loggedIn = true;

                res.json({ userData, message: `You are now logged in as ${userData.username}!` })
            })
        })
});

// LOGOUT a user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

// UPDATE a user
router.put('/:id', (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({
                    message: "No user found with that ID."
                });
                return;
            }
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

// DELETE a user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(userData => {
            if (!userData) {
                res.status(404).json({
                    message: "No user found with that ID."
                });
                return;
            }
            res.json(userData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

// CREATE a user
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(newUserData => {
        req.session.save(() => {
            req.session.user_id = newUserData.id;
            req.session.username = newUserData.username;
            req.session.loggedIn = true;

            res.json(newUserData);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// LOGIN a user
router.post('/login', (req, res) => {
    User.findOne({
        wher: {
            email: req.body.email
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(400).json({ message: "No user with that email address."});
            return;
        }

        req.session.save(() =>{
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.loggedIn = true;

            res.json({ userData, message: `You are now logged in as ${userData.username}!`})
        })
    })
});

// LOGOUT a user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
})

// UPDATE a user
router.put('/:id', (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({
                message: "No user found with that ID."
            });
            return;
        }
        res.json(userData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// DELETE a user
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(userData => {
        if (!userData) {
            res.status(404).json({
                message: "No user found with that ID."
            });
            return;
        }
        res.json(userData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

module.exports = router;