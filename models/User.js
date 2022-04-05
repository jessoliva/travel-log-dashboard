// import the Model class and DataTypes object from Sequelize
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// to hash passwords to protect them!
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {
    // checks password at login to user's password
    pwCheck(loginPw) {
        return bcrypt.compareSync(loginPw, this.password)
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        // fullname: {
        //     type: DataTypes.STRING,
        //     allowNull: false
        // },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        }
    },
    {  
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            // async/await syntax
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },   
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);

module.exports = User;