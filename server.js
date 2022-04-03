const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3001;
const sess = {
    secret: '42',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});

//multer upload & save functions
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) =>{
    cb(null, './saved-posts');//where all user posts go
  },
  filename: (req, file, cb) =>{
    cb(null, Date.now() + "__" + file.originalname)
  }
});
const upload =multer({storage: fileStorageEngine});

app.post("/single", upload.single("saved-posts"),(req,res)=>{
  res.send('single file upload success')
})//upload a single file

//lets user upload multiple files 
app.post("/multiple",upload.array('saved-posts', 4),
(req,res)=>{
  res.send('multiple file upload success')
})

app.listen(5000);

