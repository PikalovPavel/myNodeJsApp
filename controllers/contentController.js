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
    usercabinet: (req, resp) => {
        resp.render('usercabinet');
    }

};