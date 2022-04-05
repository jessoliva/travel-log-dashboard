const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
// require multer to upload photos
const multer = require('multer');
const { append } = require('express/lib/response');

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


// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/images')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname)
//     }
// })
// var upload = multer({ storage: storage })

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "../../public/images")
    },
    filename: function (req, file, cb) {
        const parts = file.mimetype.split("/");
        cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`)
    }
});

const upload = multer({storage});

router.post('/save-image', upload.single('image'), (req, res) => {
    res.sendFile(`${__dirname}/public/images/${req.file.filename}`);
});

// app.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
//     // req.file is the `profile-file` file
//     // req.body will hold the text fields, if there were any
//     console.log(JSON.stringify(req.file))
//     var response = '<a href="/">Home</a><br>'
//     response += "Files uploaded successfully.<br>"
//     response += `<img src="${req.file.path}" /><br>`
//     return res.send(response)
// });

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