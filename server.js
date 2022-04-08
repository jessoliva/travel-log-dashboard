const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const path = require("path");
const routes = require('./controllers');
const sequelize = require('./config/connection');
// handlebars dependencies
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
const hbs = exphbs.create({ helpers });

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

// UPLOAD IMAGES START
// require upload function for multer
const upload = require('./cont-middleware/upload');

app.post('/create', upload.single('image'), (req, res) => { });
// UPLOAD IMAGES END

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sess));
// handlebars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(routes);


sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});
