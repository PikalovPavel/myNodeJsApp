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
    creators: (req, resp) => {
        resp.render('creators');
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
    usercabinetrequests: (req, resp) => {
        resp.render('user-cabinet-requests');
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
    },
    admincabinetmap: (req, resp) => {
        resp.render('admin-cabinet-map');
    },
    workercabinetregister: (req, resp) => {
        resp.render('worker-cabinet-register');
    },
    workercabinetadd: (req, resp) => {
        resp.render('worker-cabinet-add');
    },
    workercabinetmap: (req, resp) => {
        resp.render('worker-cabinet-map');
    },
    comingsoon: (req, resp) => {
        resp.render('comingsoon');
    }


};