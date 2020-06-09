//Importing Modules
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const members = require('./Members');

//Importing Local Modules
const logger = require('./Logger');

//Initializing Express
const app = express();

var PORT = process.env.PORT || 5000;

//Set Engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render('home', {
        title: 'Member Management App',
        members
    });
});

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Members API Routes
app.use('/api/members', require('./routes/api/members'));

//Using Logger
app.use(logger);

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT);
