const { Model, DataTypes } = require('sequelize');
// connection to MySQL we stored in the connection.js
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {}

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
        location: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
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
        lodging_cost: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
            validate: {
                isNumeric: true
            }
        },
        transportation_cost: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true,
            validate: {
                isNumeric: true
            }
        },
        transportation_tips: {
            type: DataTypes.TEXT,
            validate: {
                len: [10]
            }
        },
        travel_tips: {
            type: DataTypes.TEXT,
            validate: {
                len: [10]
            }
        },
        safety_tips: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                len: [10]
            }
        },
        pets: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        kids: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        companion: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1]
            }
        },
        safety_rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                isNumeric: true
            }
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