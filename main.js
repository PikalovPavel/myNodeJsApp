//Импорт модулей//
const synchronizer = require('./services/synchronizer')();
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const session = require('express-session');
const expressHandlebars = require('express-handlebars');
const passport = require('passport');
const flash = require('connect-flash');
const app = express();
const sequelize = synchronizer.sequelize;

const bot = require('./bot/bot')(synchronizer);


//Настройки Handlebars
app.set('views', './views');
app.engine('hbs', expressHandlebars({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
//Настройка статического пути (root)
const path = require('path');
app.use(express.static(path.join(__dirname, '/views')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(flash());
app.use(session({secret: 'mysecret', resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport/passport')(passport, sequelize.models.User);

require('./routes/authRoute')(app, passport);
require('./routes/contentRoute')(app, passport);
require('./controllers/dataController')(app, synchronizer);

synchronizer.sync(false);
server = http.createServer(app);

server.listen(64000, function (err) {
    let host = server.address().address,
        port = 64000;
    console.log('listening at http://localhost:%s', port);
});