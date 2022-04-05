const router = require('express').Router();
const { Post, User, Comment, Save } = require('../../models');

// GET all posts
router.get('/', (req, res) => {
    Post.findAll({
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['id', 'username']
            }
        ]
    })
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
        },
        include: [
            {
                model: Comment,
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['id', 'username']
            }
        ]
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
        title: req.body.title,
        city: req.body.city,
        country: req.body.country,
        description: req.body.description,
        restaurants: req.body.restaurants,
        attractions: req.body.attractions,
        meal_cost: req.body.meal_cost,
        hotel_cost: req.body.hotel_cost,
        tips: req.body.tips,
        kid_friendly: req.body.kid_friendly,
        pet_friendly: req.body.pet_friendly,
        safety_rating: req.body.safety_rating,
        user_id: req.session.user_id
    })
        .then(newPostData => res.json(newPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        });
});

// SAVE a post
router.put('/save', (req, res) => {
        Post.save(
            {
                post_id: req.body.post_id,
                user_id: req.session.user_id
            },
            {
                Save, User, Comment
            }
        )
        .then(savedPostData => res.json(savedPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// UPDATE a post
router.put('/:id', (req, res) => {
    Post.update(req.body, {
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

// DELETE a post
router.delete('/:id', (req, res) => {
    Post.destroy({
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

module.exports = router;