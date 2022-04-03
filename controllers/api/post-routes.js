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
        title: req.body.title,
        location: req.body.location,
        description: req.body.description
        // restaurants: req.body.restaurants,
        // attractions: req.body.attractions,
        // lodging_cost: req.body.lodging_cost,
        // transportation_cost: req.body.transportation_cost,
        // transportation_tips: req.body.transportation_tips,
        // travel_tips: req.body.travel_tips,
        // safety_tips: req.body.safety_tips,
        // pets: req.body.pets,
        // kids: req.body.kids,
        // companion: req.body.companion,
        // safety_rating: req.body.safety_rating,
        // user_id: req.session.user_id
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