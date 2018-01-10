const Sequelize = require('sequelize');


const sequelize = new Sequelize('postgres', 'postgres', 123, {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
            max: 1,
            min: 0,
            idle: 10000
        },
    }
);

const User = sequelize.import("../models/User.js");
const ТИП_КАМЕРЫ = sequelize.import("../models/CameraType.js");
const КАМЕРА = sequelize.import("../models/Camera.js");
const ЧЕЛОВЕК = sequelize.import("../models/Human.js");
const ЗАКЛЮЧЁННЫЙ = sequelize.import("../models/Prisoner.js");
const ПЕРСОНАЛ = sequelize.import("../models/Personnel.js");
const СТАТЬЯ = sequelize.import("../models/Paragraph.js");
const ПРЕДМЕТ = sequelize.import("../models/Subject.js");
const УЧИТЕЛЬ = sequelize.import("../models/Teacher.js");
const ЖУРНАЛ = sequelize.import("../models/Register.js");
const РОДСТВЕННАЯ_СВЯЗЬ = sequelize.import("../models/Kinship.js");
const ПОСЕЩЕНИЕ = sequelize.import("../models/Visit.js");
const ДОСРОЧНОЕ = sequelize.import("../models/EarlyRelease.js");
const НОВОСТЬ = sequelize.import("../models/New.js");


ТИП_КАМЕРЫ.hasMany(КАМЕРА,  {foreignKey: 'ТИП_КАМЕРЫ'});
ЧЕЛОВЕК.hasOne(ЗАКЛЮЧЁННЫЙ, {foreignKey: 'ЧЕЛОВЕК_ИД'} );
ЧЕЛОВЕК.hasOne(ПЕРСОНАЛ, {foreignKey: 'ЧЕЛОВЕК_ИД'} );
ЧЕЛОВЕК.hasOne(УЧИТЕЛЬ, {foreignKey: 'УЧИТЕЛЬ_ИД'} );
ЧЕЛОВЕК.hasMany(РОДСТВЕННАЯ_СВЯЗЬ, {foreignKey: 'РОДСТВЕННИК_ИД'} );
ЧЕЛОВЕК.hasMany(ПОСЕЩЕНИЕ, {foreignKey: 'РОДСТВЕННИК_ИД'} );
ЧЕЛОВЕК.hasMany(ДОСРОЧНОЕ, {foreignKey: 'РОДСТВЕННИК_ИД'} );
СТАТЬЯ.hasMany(ЗАКЛЮЧЁННЫЙ,  {foreignKey: 'СТАТЬЯ'});
ЗАКЛЮЧЁННЫЙ.hasMany(ЖУРНАЛ,  {foreignKey: 'ЗК_ИД'});
ЗАКЛЮЧЁННЫЙ.hasMany(РОДСТВЕННАЯ_СВЯЗЬ,  {foreignKey: 'ЗК_ИД'});
ЗАКЛЮЧЁННЫЙ.hasMany(ПОСЕЩЕНИЕ,  {foreignKey: 'ЗК_ИД'});
ЗАКЛЮЧЁННЫЙ.hasMany(ДОСРОЧНОЕ,  {foreignKey: 'ЗК_ИД'});
ПРЕДМЕТ.hasMany(УЧИТЕЛЬ,  {foreignKey: 'ПРЕДМЕТ'});
ПРЕДМЕТ.hasMany(ЖУРНАЛ, {foreignKey: 'ПРЕДМЕТ'});
УЧИТЕЛЬ.hasMany(ЖУРНАЛ,  {foreignKey: 'УЧИТЕЛЬ_ИД'});

module.sequelize = sequelize;

module.exports = () => {
    module.sync = async (arg) => {
        await sequelize.sync({
            force: arg
        });
    };

    return module;
};
