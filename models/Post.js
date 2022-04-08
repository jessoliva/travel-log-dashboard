const { Model, DataTypes } = require('sequelize');
// connection to MySQL we stored in the connection.js
const sequelize = require('../config/connection');

// create our Post model
<<<<<<< HEAD
class Post extends Model { }
=======
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
>>>>>>> dev/jess-merge

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
<<<<<<< HEAD
            validate: {
                len: [1]
            }
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
=======
        },
        city: {
            type: DataTypes.STRING,
        },
        state_province: {
            type: DataTypes.STRING,
        },
        country: {
            type: DataTypes.STRING,
        },
        image_name: {
            type: DataTypes.STRING,
>>>>>>> dev/jess-merge
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
<<<<<<< HEAD
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
=======
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
>>>>>>> dev/jess-merge
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