const authController = require('../controllers/contentController');

module.exports = (app, passport) => {

    const isLoggedIn = (req, resp, next) => {
        if (req.isAuthenticated())
            return next();
        resp.redirect('/signin');
    };
    app.get('/main', isLoggedIn, authController.main);

    app.get ('/about', isLoggedIn, authController.about);

    app.get ('/gallery', isLoggedIn, authController.gallery);

    app.get ('/creators', isLoggedIn, authController.creators);

    app.get ('/user-cabinet-register', isLoggedIn, authController.usercabinetregister);

    app.get ('/user-cabinet-visit', isLoggedIn, authController.usercabinetvisit);

    app.get ('/user-cabinet-release', isLoggedIn, authController.usercabinetrelease);

    app.get ('/user-cabinet-requests', isLoggedIn, authController.usercabinetrequests);

    app.get ('/comingsoon', isLoggedIn, authController.comingsoon);
};