const { Model, DataTypes } = require('sequelize');
// connection to MySQL we stored in the connection.js
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {
    static save(body, models) {
        return models.Save.create({
            user_id: body.user_id,
            post_id: body.post_id
        })
        .then(() => {
            return Post.findOne({
                where: {
                    id: body.post_id
                }
            })
        })
    }
}

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
        },
        attractions: {
            type: DataTypes.TEXT,
        },
        meal_cost: {
            type: DataTypes.STRING,
        },
        hotel_cost: {
            type: DataTypes.STRING,
        },
        tips: {
            type: DataTypes.TEXT,
        },
        kid_friendly: {
            type: DataTypes.STRING,
        },
        pet_friendly: {
            type: DataTypes.STRING,
        },
        safety_rating: {
            type: DataTypes.STRING,
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