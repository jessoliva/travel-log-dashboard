const { Comment } = require('../models');


const commentdata = [
{
    text:'xdywa  awyb iab iuash byo',
    user_id:'3',
    post_id:'2',
},
{
    text:'xdsg auys ckasniu',
    user_id:'2',
    post_id:'4',
},
{
    text:'cdask ciauhc auyucg',
    user_id:'3',
    post_id:'1',
},
{
    text:'xwab asbhc ascb ua',
    user_id:'4',
    post_id:'1',
},
{
    text:'asyc asuc aidwh ci', 
    user_id:'1',
    post_id:'3',
},


];
const seedComments = () => Comment.bulkCreate(commentdata);

module.exports = seedComments;