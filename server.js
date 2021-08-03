const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');

//set up handlebars as template engine part 1
const exphbs = require('express-handlebars');
const hbs = exphbs.create({});

const app = express();
const PORT = process.env.PORT || 3001;

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