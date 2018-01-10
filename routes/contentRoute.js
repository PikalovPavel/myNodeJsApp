const authController = require('../controllers/contentController');

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

    app.get('/main', isLoggedIn, authController.main);


    app.get ('/about', isLoggedIn, authController.about);

    app.get ('/gallery', isLoggedIn, authController.gallery);

    app.get ('/usercabinet', isLoggedIn, authController.usercabinet);

};