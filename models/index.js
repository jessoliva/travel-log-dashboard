// const {User, Post, Comment, Save} = require('./models');

// import all models
const User = require('./User');
const Post = require('./Post');
const Save = require('./Save');
const Comment = require('./Comment');

// create associations
// User and Post
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

// User and Post through Save
// If we want to see which users saved a single post, we can now do that
// If we want to see which posts a single user saved, we can see that too
User.belongsToMany(Post, { 
    through: Save,
    as: 'saved_posts',
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
}); 
//belongsToMany needs the through: property
Post.belongsToMany(User, {
    through: Save,
    as: 'saved_posts',
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

// User and Comment
Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'SET NULL'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});

Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

// // direct associations between Save, User, and Post
// Save.belongsTo(User, {
//     foreignKey: 'user_id'
// });

// Save.belongsTo(Post, {
//   foreignKey: 'post_id'
// });

// User.hasMany(Save, {
//   foreignKey: 'user_id'
// });

// Post.hasMany(Save, {
//   foreignKey: 'post_id'
// });

module.exports = { User, Post, Save, Comment };