module.exports = {
    main: (req, resp) => {
        resp.render('main');
    },
    odds: (req, resp) => {
        resp.render('odds');
    },
    settings: (req, resp) => {
        resp.render('settings');
    },
    about: (req, resp) => {
        resp.render('about');
    },
    gallery: (req, resp) => {
        resp.render('gallery');
    },
    usercabinetregister: (req, resp) => {
        resp.render('user-cabinet-register');
    },
    usercabinetvisit: (req, resp) => {
        resp.render('user-cabinet-visit');
    },
    usercabinetrelease: (req, resp) => {
        resp.render('user-cabinet-release');
    },
    admincabinetprisoners: (req, resp) => {
        resp.render('admin-cabinet-prisoners');
    },
    admincabinetworkers: (req, resp) => {
        resp.render('admin-cabinet-workers');
    },
    admincabinetvisit: (req, resp) => {
        resp.render('admin-cabinet-visit');
    },
    admincabinetrelease: (req, resp) => {
        resp.render('admin-cabinet-release');
    }


};