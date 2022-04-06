const { Model, DataTypes } = require('sequelize');
// connection to MySQL we stored in the connection.js
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model { }

// create fields/columns for Post model
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        city: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
        },
        state_province: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
        },
        country: {
            type: DataTypes.STRING,
            validate: {
                len: [1]
            }
        },
        image_name: {
            type: DataTypes.STRING,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        restaurants: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        attractions: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        meal_cost: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hotel_cost: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tips: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: [10]
            }
        },
        kid_friendly: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pet_friendly: {
            type: DataTypes.STRING,
            allowNull: true
        },
        safety_rating: {
            type: DataTypes.STRING,
            allowNull: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

module.exports = Post;