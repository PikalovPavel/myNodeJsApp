module.exports = {
    signup: (req, resp) => {
        resp.render('signup', {
            message: req.flash('error')
        });
    },
    main: (req, resp) => {
        resp.render('main');
    },
    signin: (req, resp) => {
        resp.render('signin', {
            message: req.flash('error')
        });
    },
    logout: (req, resp) => {
        req.session.destroy(function (err) {
            resp.redirect('/signin');
        });
    },
    work: (req, resp) => {
        resp.render('signin', {
            message: req.flash('error')
        });
    },
};