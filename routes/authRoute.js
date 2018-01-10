const authController = require('../controllers/authController');

module.exports = (app, passport) => {

    const isLoggedIn = (req, resp, next) => {
        if (req.isAuthenticated())
            return next();
        resp.redirect('/signin');
    };

    const isNotLoggedIn = (req, resp, next) => {
        if (!req.isAuthenticated())
            return next();
        resp.redirect('/main');
    };


    app.get('/signup', isNotLoggedIn, authController.signup);

    app.get('/signin', isNotLoggedIn, authController.signin);

    app.get('/logout', isLoggedIn, authController.logout);


    app.post('/signup', passport.authenticate('local-signup', {
            badRequestMessage: 'Заполните ВСЕ поля.',
            successRedirect: '/main',
            failureRedirect: '/signup',
            failureFlash: true
        }
    ));

    app.post('/signin', passport.authenticate('local-signin', {
            badRequestMessage: 'Заполните ВСЕ поля.',
            successRedirect: '/main',
            failureRedirect: '/signin',
            failureFlash: true
        }
    ));

    app.get('/', (req, resp) => {
        resp.redirect('/signin');
    });

};