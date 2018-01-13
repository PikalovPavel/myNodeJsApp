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

    app.get ('/creators', isLoggedIn, authController.creators);

    app.get ('/user-cabinet-register', isLoggedIn, authController.usercabinetregister);

    app.get ('/user-cabinet-visit', isLoggedIn, authController.usercabinetvisit);

    app.get ('/user-cabinet-release', isLoggedIn, authController.usercabinetrelease);

    app.get ('/user-cabinet-requests', isLoggedIn, authController.usercabinetrequests);

   //  app.get ('/admin-cabinet-prisoners', isLoggedIn, authController.admincabinetprisoners);
   //
   //  app.get ('/admin-cabinet-workers', isLoggedIn, authController.admincabinetworkers);
   //
   //  app.get ('/admin-cabinet-visit', isLoggedIn, authController.admincabinetvisit);
   //
   //  app.get ('/admin-cabinet-release', isLoggedIn, authController.admincabinetrelease);
   //
   //  app.get ('/admin-cabinet-map', isLoggedIn, authController.admincabinetmap);
   //
   //  app.get ('/worker-cabinet-register', isLoggedIn, authController.workercabinetregister);
   //
   //  app.get ('/worker-cabinet-add', isLoggedIn, authController.workercabinetadd);
   //
   //  app.get ('/worker-cabinet-map', isLoggedIn, authController.workercabinetmap);

    app.get ('/comingsoon', isLoggedIn, authController.comingsoon);


};