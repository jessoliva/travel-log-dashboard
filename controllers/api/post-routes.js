const router = require('express').Router();
const { Post, User } = require('../../models');

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
        location: req.body.location,
        description: req.body.description,
        restaurants: req.body.restaurants,
        attraction: req.body.attractions,
        meal_cost: req.body.attractions,
        hotel_cost: req.body.lodging_cost,
        tips: req.body.transportation_cost,
        kid_friendly: req.body.transportation_tips,
        pet_friendly: req.body.travel_tips,
        safety_rating: req.body.safety_tips,
        user_id: req.session.user_id
    })
        .then(newPostData => res.json(newPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
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