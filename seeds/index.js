const seedUsers = require('./user-seeds');
const seedPosts = require('./post-seeds');
const seedComments = require('./comment-seeds');
const seedSaves = require('./save-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    await seedUsers();  
    await seedPosts();
    await seedComments();
    await seedSaves();

    process.exit(0);
  };
  
  seedAll();