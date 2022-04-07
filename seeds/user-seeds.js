const sequelize = require('../config/connection');
const { User, Post } = require('../models');

const userdata = [
  {
    username: 'jessoliva',
    password:'password1122',
    email:'jessoli@ut.com',
  },
  {
    username:'stevietru',
    password:'password1122',
    email:'stevietru@ut.com'
  },
  {
    username:'sheroobha',
    password:'password1122',
    email:'sheroo@ut.com'
  },
  {
    username:'edmerval',
    password:'password1122',
    email:'edmerval@ut.com'
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true});

module.exports = seedUsers;
