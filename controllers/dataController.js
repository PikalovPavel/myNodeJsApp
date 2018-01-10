module.exports = (app, synchronizer) => {
    const isLoggedIn = (req, resp, next) => {
        if (req.isAuthenticated())
            return next();
        resp.redirect('/signin');
    };



    app.get('/api/leagues', isLoggedIn, (req, resp) => {
        synchronizer.sequelize.models.League.findAll().then((league) => {
            resp.send(JSON.stringify(league))
        });
    });

    app.get('/api/block', isLoggedIn, (req, resp) => {
        synchronizer.sequelize.models.КАМЕРА.findAll().then((block) => {
            resp.send(JSON.stringify(block))
        });
    });

    app.get('/work',isLoggedIn, (req, resp)=> {
        console.log(req.user.user_id);
        synchronizer.sequelize.models.User.findOne ({
            where : {
                user_id: req.user.user_id,
                role: 'WORKER'
            },

        }).then((user)=> {
            if (user) {
                resp.redirect('/work');
            }
        });
    });




    app.get('/admin',isLoggedIn, (req, resp)=> {
        console.log(req.user.user_id);
        synchronizer.sequelize.models.User.findOne ({
            where : {
                user_id: req.user.user_id,
                role: 'ADMIN'
            },

        }).then((user)=> {
            if (user) resp.redirect('/admin');
        });
    });

    app.get('/api/register/:prId/:subId',isLoggedIn, (req, resp)=> {
        synchronizer.sequelize.models.ЖУРНАЛ.findOne ({
            where : {
                ЧЕЛОВЕК_ИД: req.params.prId,
                НАЗВАНИЕ: req.params.subId
            },
            attributes: ['ЧЕЛОВЕК_ИД','КР1','КР2','КР3','КР4','ЛК'],
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

    app.get('/api/subjects', isLoggedIn, (req, resp) => {
        synchronizer.sequelize.models.ПРЕДМЕТ.findAll({
            attributes: ['НАЗВАНИЕ']
        }).then((subject) => {
            subject ?
                resp.send(JSON.stringify(subject)) :
                resp.send('[]');
        });
    });

    app.get('/test/:id1/:id2', (req,resp)=>{

       synchronizer.sequelize.query("INSERT into ПРЕДМЕТ VALUES('"+req.params.id1+"', '"+req.params.id2.toString()+"')").spread((results, metadata) => {
       }).catch(function (err) {
           console.log("error");
       });
    });
    app.get('/api/leagues/:code', isLoggedIn, (req, resp) => {
        synchronizer.sequelize.models.League.findOne({
            where: {
                league_code: req.params.code
            },
            include: [
                {
                    model: synchronizer.sequelize.models.LeagueParticipation,
                    as: 'league_participation',
                    attributes: {
                        exclude: ['team_id', 'league_id']
                    },
                    include: [
                        {
                            model: synchronizer.sequelize.models.Team,
                            as: 'team'
                        }
                    ]
                }
            ],
        }).then((league) => {
            league ?
                resp.send(JSON.stringify(league)) :
                resp.send('{}');
        });
    });

    app.get('/api/leagues/:code/matches', isLoggedIn, (req, resp) => {
        synchronizer.sequelize.models.Match.findAll({
            where: {
                league_id: synchronizer.cachedLeagues.get(req.params.code)
            },
            include: [
                {
                    model: synchronizer.sequelize.models.Team,
                    as: 'home_team',
                    attributes: {
                        exclude: ['team_id']
                    }
                },
                {
                    model: synchronizer.sequelize.models.Team,
                    as: 'away_team',
                    attributes: {
                        exclude: ['team_id']
                    }
                }
            ],
            attributes: {
                exclude: [
                    'league_id',
                    'home_team_id',
                    'away_team_id'
                ]
            }, order: [['match_date', 'DESC']]
        }).then((matches) => {
            matches ?
                resp.send(JSON.stringify(matches)) :
                resp.send('[]');
        })
    });

    app.get('/api/teams/:id', isLoggedIn, (req, resp) => {
        synchronizer.sequelize.models.Team.findOne({
            where: {
                team_id: req.params.id
            }
        }).then((team) => {
            team ?
                resp.send(JSON.stringify(team)) :
                resp.send('{}');
        });
    });

    app.get('/api/teams/:id/matches', isLoggedIn, (req, resp) => {
        synchronizer.sequelize.models.Match.findAll({
            where: {
                $or: [
                    {
                        home_team_id: req.params.id
                    },
                    {
                        away_team_id: req.params.id
                    }
                ]
            }, order: [['match_date', 'DESC']]
        }).then((matches) => {
            matches ?
                resp.send(JSON.stringify(matches)) :
                resp.send('[]');
        });
    });

    app.get('/api/bookmakers', isLoggedIn, (req, resp) => {
        synchronizer.sequelize.models.Bookmaker.findAll({}).then((bookmakers) => {
            bookmakers ?
                resp.send(JSON.stringify(bookmakers)) :
                resp.send('[]');
        });
    });

    app.get('/api/matches/:id', isLoggedIn, (req, resp) => {
        synchronizer.sequelize.models.Match.findOne({
            where: {
                match_id: req.params.id
            }, include: [
                {
                    model: synchronizer.sequelize.models.Event,
                    as: 'events',
                    include: [
                        {
                            model: synchronizer.sequelize.models.Offer,
                            as: 'offers',
                            attributes: {
                                exclude: [
                                    "event_id"
                                ]
                            }
                        }
                    ],
                    attributes: {
                        exclude: [
                            'match_id',
                        ]
                    }
                },
            ]
        }).then((match) => {
            match ?
                resp.send(JSON.stringify(match)) :
                resp.send('{}');
        });
    });

    app.get('/api/odds/actual', isLoggedIn, (req, resp) => {
        synchronizer.sequelize.models.Match.findAll({
            where: {
                match_status: 'TIMED'
            }, include: [
                {
                    model: synchronizer.sequelize.models.Team,
                    as: 'home_team',
                    attributes: {
                        exclude: ['team_id']
                    }
                },
                {
                    model: synchronizer.sequelize.models.Team,
                    as: 'away_team',
                    attributes: {
                        exclude: ['team_id']
                    }
                },
                {
                    model: synchronizer.sequelize.models.Event,
                    as: 'events',
                    include: [
                        {
                            model: synchronizer.sequelize.models.Offer,
                            as: 'offers',
                            attributes: {
                                exclude: [
                                    "event_id"
                                ]
                            }
                        }
                    ],
                    attributes: {
                        exclude: [
                            'match_id',
                        ]
                    }
                },
            ],
            attributes: {
                exclude: ['home_team_id', 'away_team_id']
            }, order: [['match_date']]
        }).then((matches) => {
            matches ?
                resp.send(JSON.stringify(matches)) :
                resp.send('{}');
        });
    });

    app.get('/api/matches', isLoggedIn, (req, resp) => {
        synchronizer.sequelize.models.Match.findAll({
            where: {
                match_status: 'TIMED'
            },
            include: [
                {
                    model: synchronizer.sequelize.models.Team,
                    as: 'home_team',
                    attributes: {
                        exclude: ['team_id']
                    }
                },
                {
                    model: synchronizer.sequelize.models.Team,
                    as: 'away_team',
                    attributes: {
                        exclude: ['team_id']
                    }
                }
            ],
            attributes: {
                exclude: [
                    'home_team_goals',
                    'away_team_goals',
                    'home_team_id',
                    'away_team_id'
                ]
            }, order: [['match_date', 'DESC']]
        }).then((match) => {
            match ?
                resp.send(JSON.stringify(match)) :
                resp.send('[]');
        });
    });

    app.get('/api/leagues/:code/matches/timed', isLoggedIn, (req, resp) => {
        synchronizer.sequelize.models.Match.findAll({
            where: {
                league_id: synchronizer.cachedLeagues.get(req.params.code),
                match_status: 'TIMED'
            },
            include: [
                {
                    model: synchronizer.sequelize.models.Team,
                    as: 'home_team',
                    attributes: {
                        exclude: ['team_id']
                    }
                },
                {
                    model: synchronizer.sequelize.models.Team,
                    as: 'away_team',
                    attributes: {
                        exclude: ['team_id']
                    }
                }
            ],
            attributes: {
                exclude: [
                    'home_team_goals',
                    'away_team_goals',
                    'home_team_id',
                    'away_team_id'
                ]
            }, order: [['match_date', 'DESC']]
        }).then((matches) => {
            matches ?
                resp.send(JSON.stringify(matches)) :
                resp.send('[]');
        })
    });
};