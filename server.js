const express = require('express');
const routes = require('./controllers');
const path = require('path');
const session = require('express-session');
//set up handlebars as template engine (exphbs and hbs)
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};



app.use(session(sess));
const hbs = exphbs.create({});

//set up handlesbars as template engine part 2
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//express.static takes all the content of the folder and serves them as static assets. 
//usefull for Front End files like img, css and js
app.use(express.static(path.join(__dirname, 'public')));

// turn on routes
app.use(routes);

//set up handlesbars as template engine part 2
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on connection to db and server
//true allows the tables to re-create if there are any association changes
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});