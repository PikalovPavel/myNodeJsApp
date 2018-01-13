const contentController = require('./contentController');
module.exports = (app, synchronizer) => {

    const isLoggedIn = (req, resp, next) => {
        if (req.isAuthenticated())
            return next();
        resp.redirect('/signin');
    };



    app.get('/worker-cabinet-add',isLoggedIn, (req, resp)=> {
        console.log(req.user.user_id);
        synchronizer.sequelize.models.User.findOne ({
            where : {
                $or: [
                    {
                        user_id: req.user.user_id,
                        role: 'WORKER'
                    },
                    {
                        user_id: req.user.user_id,
                        role: 'ADMIN'
                    }
                ]
            },

        }).then((user)=> {
            if (user) resp.render('worker-cabinet-add');
            else resp.redirect('/main');
        });
    });

    app.get('/worker-cabinet-map',isLoggedIn, (req, resp)=> {
        console.log(req.user.user_id);
        synchronizer.sequelize.models.User.findOne ({
            where : {
                $or: [
                    {
                        user_id: req.user.user_id,
                        role: 'WORKER'
                    },
                    {
                        user_id: req.user.user_id,
                        role: 'ADMIN'
                    }
                ]
            },

        }).then((user)=> {
            if (user) resp.render('worker-cabinet-map');
            else resp.redirect('/main');
        });
    });

    app.get('/worker-cabinet-register', isLoggedIn, (req, resp)=> {
        console.log(req.body);
        synchronizer.sequelize.models.User.findOne ({
            where : {
                $or: [
                    {
                        user_id: req.user.user_id,
                        role: 'WORKER'
                    },
                    {
                        user_id: req.user.user_id,
                        role: 'ADMIN'
                    }
                ]
            },

        }).then((user)=> {
            if (user) resp.render('worker-cabinet-register');
            else resp.redirect('/main');
        });

    });

    app.get('/admin-cabinet-map',isLoggedIn, (req, resp)=> {
        console.log(req.user.user_id);
        synchronizer.sequelize.models.User.findOne ({
            where : {
                user_id: req.user.user_id,
                role: 'ADMIN'
            },

        }).then((user)=> {
            if (user) resp.render('admin-cabinet-map');
            else resp.redirect('/main');
        });
    });
    app.get('/admin-cabinet-prisoners',isLoggedIn, (req, resp)=> {
        console.log(req.user.user_id);
        synchronizer.sequelize.models.User.findOne ({
            where : {
                user_id: req.user.user_id,
                role: 'ADMIN'
            },

        }).then((user)=> {
            if (user) resp.render('admin-cabinet-prisoners');
            else resp.redirect('/main');
        });
    });
    app.get('/admin-cabinet-release',isLoggedIn, (req, resp)=> {
        console.log(req.user.user_id);
        synchronizer.sequelize.models.User.findOne ({
            where : {
                user_id: req.user.user_id,
                role: 'ADMIN'
            },

        }).then((user)=> {
            if (user) resp.render('admin-cabinet-release');
            else resp.redirect('/main');
        });
    });
    app.get('/admin-cabinet-visit',isLoggedIn, (req, resp)=> {
        console.log(req.user.user_id);
        synchronizer.sequelize.models.User.findOne ({
            where : {
                user_id: req.user.user_id,
                role: 'ADMIN'
            },

        }).then((user)=> {
            if (user) resp.render('admin-cabinet-visit');
            else resp.redirect('/main');
        });
    });
    app.get('/admin-cabinet-workers',isLoggedIn, (req, resp)=> {
        console.log(req.user.user_id);
        synchronizer.sequelize.models.User.findOne ({
            where : {
                user_id: req.user.user_id,
                role: 'ADMIN'
            },

        }).then((user)=> {
            if (user) resp.render('admin-cabinet-workers');
            else resp.redirect('/main');
        });
    });
    app.get('/api/user',isLoggedIn, (req, resp)=> {
        synchronizer.sequelize.models.User.findOne ({
            where : {
                user_id: req.user.user_id
            },

        }).then((userus)=> {
            userus ?
                resp.send(JSON.stringify(userus)) :
                resp.send('{}');
        });
    });

    app.get('/api/register/:prId/:subId',isLoggedIn, (req, resp)=> {
        synchronizer.sequelize.models.ЖУРНАЛ.findOne ({
            where : {
                ЧЕЛОВЕК_ИД: req.params.prId,
                ПРЕДМЕТ: req.params.subId
            },
            include: [
                {
                    model: synchronizer.sequelize.models.ЗАКЛЮЧЁННЫЙ,
                    as: 'prisoner_register',
                    attributes: {
                        exclude: ['СТАТЬЯ','СРОК','ТИП_РАЦИОНА','ТИП_КАМЕРЫ','ШТРАФЫ','НОМЕР_КАМЕРЫ']
                    },
                   include: [
                       {
                           model:synchronizer.sequelize.models.ЧЕЛОВЕК,
                           as: 'human_prisoner',
                           attributes: {
                               exclude: ['ЧЕЛОВЕК_ИД','ОТЧЕСТВО','Дата_Рождения','ПОЛ','РОЛЬ','ПАРОЛЬ','АВАТАР']
                           }
                       }

                   ]
                }
            ]

        }).then((register)=> {
            register ?
                resp.send(JSON.stringify(register)) :
                resp.send('{}');
        });
    });

    app.get('/api/register/:prId/:subId',isLoggedIn, (req, resp)=> {
        synchronizer.sequelize.models.ЖУРНАЛ.findAll ({
            where : {
                ПРЕДМЕТ: req.params.subId,
                ЧЕЛОВЕК_ИД: req.params.prId
            },
            include: [
                {
                    model: synchronizer.sequelize.models.ЗАКЛЮЧЁННЫЙ,
                    as: 'prisoner_register',
                    attributes: {
                        exclude: ['СТАТЬЯ','СРОК','ТИП_РАЦИОНА','ТИП_КАМЕРЫ','ШТРАФЫ','НОМЕР_КАМЕРЫ']
                    },
                    include: [
                        {
                            model:synchronizer.sequelize.models.ЧЕЛОВЕК,
                            as: 'human_prisoner',
                            attributes: {
                                exclude: ['ЧЕЛОВЕК_ИД','ОТЧЕСТВО','Дата_Рождения','ПОЛ','РОЛЬ','ПАРОЛЬ','АВАТАР']
                            }
                        }

                    ]
                }
            ]

        }).then((register)=> {
            register ?
                resp.send(JSON.stringify(register)) :
                resp.send('{}');
        });
    });

    app.get('/api/registerById/:selectede',isLoggedIn, (req, resp)=> {
        synchronizer.sequelize.models.ЖУРНАЛ.findAll ({
            where : {
                ПРЕДМЕТ: req.params.selectede,
            },
            include: [
                {
                    model: synchronizer.sequelize.models.ЗАКЛЮЧЁННЫЙ,
                    as: 'prisoner_register',
                    attributes: {
                        exclude: ['СТАТЬЯ','СРОК','ТИП_РАЦИОНА','ТИП_КАМЕРЫ','ШТРАФЫ','НОМЕР_КАМЕРЫ']
                    },
                    include: [
                        {
                            model:synchronizer.sequelize.models.ЧЕЛОВЕК,
                            as: 'human_prisoner',
                            attributes: {
                                exclude: ['ЧЕЛОВЕК_ИД','ОТЧЕСТВО','Дата_Рождения','ПОЛ','РОЛЬ','ПАРОЛЬ','АВАТАР']
                            }
                        }

                    ]
                }
            ]

        }).then((register)=> {
            register ?
                resp.send(JSON.stringify(register)) :
                resp.send('{}');
        });
    });

    app.get('/api/allPrisoners',isLoggedIn, (req, resp)=> {
        synchronizer.sequelize.models.ЗАКЛЮЧЁННЫЙ.findAll ({
            attributes: ['ЧЕЛОВЕК_ИД','СТАТЬЯ','СРОК','НОМЕР_КАМЕРЫ'],
            include: [
                        {
                            model:synchronizer.sequelize.models.ЧЕЛОВЕК,
                            as: 'human_prisoner',
                            attributes: {
                                exclude: ['ЧЕЛОВЕК_ИД','ОТЧЕСТВО','ПОЛ','РОЛЬ','ПАРОЛЬ','АВАТАР']
                            }
                        },
                        {
                            model:synchronizer.sequelize.models.СТАТЬЯ,
                            as: 'par_prisoner',
                            attributes: {
                                exclude: ['СТАТЬЯ','СРОК','ОБРАТНАЯ_СИЛА']
                            }
                        }
            ]

        }).then((register)=> {
            register ?
                resp.send(JSON.stringify(register)) :
                resp.send('{}');
        });
    });

    app.get('/api/allWorkers',isLoggedIn, (req, resp)=> {
        synchronizer.sequelize.models.ПЕРСОНАЛ.findAll ({
            attributes: ['ЧЕЛОВЕК_ИД','ДАТА_НАЧАЛА_РАБОТЫ','ПРОФФЕССИЯ'],
            include: [
                {
                    model:synchronizer.sequelize.models.ЧЕЛОВЕК,
                    as: 'human_personal',
                    attributes: {
                        exclude: ['ЧЕЛОВЕК_ИД','ОТЧЕСТВО','ПОЛ','РОЛЬ','ПАРОЛЬ','АВАТАР']
                    }
                }
            ]

        }).then((register)=> {
            register ?
                resp.send(JSON.stringify(register)) :
                resp.send('{}');
        });
    });

    app.get('/api/allReleas',isLoggedIn, (req, resp)=> {
        synchronizer.sequelize.models.ДОСРОЧНОЕ.findAll ({
            attributes: ['ЧЕЛОВЕК_ИД','ТЕКСТ','СТАТУС', 'ЗАЯВЛЕНИЕ_ИД'],
            include: [
                {
                    model:synchronizer.sequelize.models.ЗАКЛЮЧЁННЫЙ,
                    as: 'release_prisoner',
                    attributes: {
                        exclude: ['ОТЧЕСТВО','ПОЛ','РОЛЬ','ПАРОЛЬ','АВАТАР']
                    },
                    include: [
                        {
                            model:synchronizer.sequelize.models.ЧЕЛОВЕК,
                            as: 'human_prisoner',
                            attributes: {
                                exclude: ['ЧЕЛОВЕК_ИД','ОТЧЕСТВО','Дата_Рождения','ПОЛ','РОЛЬ','ПАРОЛЬ','АВАТАР']
                            }
                        }

                    ]
                }
            ]
        }).then((register)=> {
            register ?
                resp.send(JSON.stringify(register)) :
                resp.send('{}');
        });
    });

    app.get('/api/allTeachers',isLoggedIn, (req, resp)=> {
        synchronizer.sequelize.models.УЧИТЕЛЬ.findAll ({
            attributes: ['ЧЕЛОВЕК_ИД','ПРЕДМЕТ_ИД'],
            include: [
                {
                    model:synchronizer.sequelize.models.ЧЕЛОВЕК,
                    as: 'human_teacher',
                    attributes: {
                        exclude: ['ЧЕЛОВЕК_ИД','ОТЧЕСТВО','ПОЛ','РОЛЬ','ПАРОЛЬ','АВАТАР']
                    }
                },
                {
                    model:synchronizer.sequelize.models.ПРЕДМЕТ,
                    as: 'subject_teacher',
                    attributes: ['НАЗВАНИЕ']
                }
            ]
        }).then((register)=> {
            register ?
                resp.send(JSON.stringify(register)) :
                resp.send('{}');
        });
    });

    app.get('/api/subjects', isLoggedIn, (req, resp) => {
        synchronizer.sequelize.models.ПРЕДМЕТ.findAll({
            attributes: ['НАЗВАНИЕ']
        }).then((subject) => {
            subject ?
                resp.send(JSON.stringify(subject)) :
                resp.send('[]');
        });
    });


    app.post('/api/release', isLoggedIn, (req, resp)=>{
        synchronizer.sequelize.query("INSERT into ДОСРОЧНОЕ(ЧЕЛОВЕК_ИД, user_id, ТЕКСТ) VALUES ('"+req.body.inpudId+"', '"+req.user.user_id+"', '"+req.body.text+"')").spread((results,metadata)=>{
            resp.send("true");
        }).catch( function (err) {
            console.log(err);
            resp.send("false");
        })
    });

    app.get('/api/getReleaseById', isLoggedIn, (req, resp)=>{
        synchronizer.sequelize.models.ДОСРОЧНОЕ.findAll({
            where: {
                user_id: req.user.user_id
            }
        }).then((releases)=>{
            releases ?
                resp.send(JSON.stringify(releases)) :
                resp.send('{}');
        });
    });

    app.get('/api/allReqEarly', isLoggedIn, (req, resp)=>{
        synchronizer.sequelize.models.ДОСРОЧНОЕ.findAll({
            where: {
                user_id: req.user.user_id
            },
            include: [
                {
                    model: synchronizer.sequelize.models.ЗАКЛЮЧЁННЫЙ,
                    as: 'release_prisoner',
                    attributes: {
                        exclude: ['СТАТЬЯ', 'СРОК']
                    },
                    include: [
                        {
                            model:synchronizer.sequelize.models.ЧЕЛОВЕК,
                            as: 'human_prisoner',
                            attributes: {
                                exclude: ['ЧЕЛОВЕК_ИД','ОТЧЕСТВО','Дата_Рождения','ПОЛ','РОЛЬ','ПАРОЛЬ','АВАТАР']
                            }
                        }
                    ]
                }
            ]
        }).then((releases)=>{
            releases ?
                resp.send(JSON.stringify(releases)) :
                resp.send('{}');
        });
    });


    app.get('/api/allReqVisit', isLoggedIn, (req, resp)=>{
        synchronizer.sequelize.models.ПОСЕЩЕНИЕ.findAll({
            where: {
                user_id: req.user.user_id
            },
            include: [
                {
                    model: synchronizer.sequelize.models.ЗАКЛЮЧЁННЫЙ,
                    as: 'visit_prisoner',
                    attributes: {
                        exclude: ['СТАТЬЯ', 'СРОК']
                    },
                    include: [
                        {
                            model:synchronizer.sequelize.models.ЧЕЛОВЕК,
                            as: 'human_prisoner',
                            attributes: {
                                exclude: ['ЧЕЛОВЕК_ИД','ОТЧЕСТВО','Дата_Рождения','ПОЛ','РОЛЬ','ПАРОЛЬ','АВАТАР']
                            }
                        }
                    ]
                }
            ]
        }).then((releases)=>{
            releases ?
                resp.send(JSON.stringify(releases)) :
                resp.send('{}');
        });
    });

    app.post('/api/setRelease', isLoggedIn, (req, resp)=>{
        var mydata = req.body;
        var res="true";
        for (key in mydata) {
            synchronizer.sequelize.query("UPDATE ДОСРОЧНОЕ SET СТАТУС = "+mydata[key]+" WHERE ЗАЯВЛЕНИЕ_ИД = "+key+"").spread((results, metadata) => {
            }).catch(function (err) {
                res="false";
            })
        }
        resp.send(res);
    });

    app.post('/api/setMarks', isLoggedIn, (req, resp)=>{
        var mydata = req.body;
        var res=true;
            synchronizer.sequelize.query("INSERT INTO ЖУРНАЛ VALUES ("+mydata.inpudId+", "+mydata.subject+", 3, "+mydata.kr1+", "+mydata.kr2+", "+mydata.kr3+", "+mydata.kr4+", "+mydata.lk+") ON CONFLICT DO NOTHING").spread((results, metadata) => {
            }).catch(function (err) {
                console.log(err);
                res=false;
            });
        resp.send(res);
    });

    app.post('/api/setVisit', isLoggedIn, (req, resp)=>{
        var mydata = req.body;
        var res="true";
        for (key in mydata) {
            synchronizer.sequelize.query("UPDATE ПОСЕЩЕНИЕ SET СТАТУС = "+mydata[key]+" WHERE ПОСЕЩЕНИЕ_ИД = "+key+"").spread((results, metadata) => {
            }).catch(function (err) {
                res="false";
            })
        }
        resp.send(res);
    });

    app.post('/api/visit', isLoggedIn, (req, resp)=>{
        var date=req.body.text.replace("/","-").replace("/","-");
        synchronizer.sequelize.query("INSERT into ПОСЕЩЕНИЕ(ЧЕЛОВЕК_ИД, user_id , ДАТА_ПОСЕЩЕНИЯ) VALUES ('"+req.body.inpudId+"', '"+req.user.user_id+"', '"+date+"')").spread((results,metadata)=>{
            resp.send("true");
        }).catch( function (err) {
            console.log(err);
            resp.send("false");
        })
    });

    app.get('/api/allVisits', isLoggedIn, (req, resp)=>{
        synchronizer.sequelize.models.ПОСЕЩЕНИЕ.findAll ({
            attributes: ['ЧЕЛОВЕК_ИД','user_id','ДАТА_ПОСЕЩЕНИЯ', 'ПОСЕЩЕНИЕ_ИД', 'СТАТУС'],
            include: [
                {
                    model:synchronizer.sequelize.models.ЗАКЛЮЧЁННЫЙ,
                    as: 'visit_prisoner',
                    attributes: {
                        exclude: ['ОТЧЕСТВО','ПОЛ','РОЛЬ','ПАРОЛЬ','АВАТАР']
                    },
                    include: [
                        {
                            model:synchronizer.sequelize.models.ЧЕЛОВЕК,
                            as: 'human_prisoner',
                            attributes: {
                                exclude: ['ЧЕЛОВЕК_ИД','ОТЧЕСТВО','Дата_Рождения','ПОЛ','РОЛЬ','ПАРОЛЬ','АВАТАР']
                            }
                        }

                    ]
                },

                {
                    model:synchronizer.sequelize.models.User,
                    as: 'visit_user',
                    attributes: {
                        exclude: ['user_id','password','role']
                    }

                }
            ]
        }).then((register)=> {
            register ?
                resp.send(JSON.stringify(register)) :
                resp.send('{}');
        });
    });

};