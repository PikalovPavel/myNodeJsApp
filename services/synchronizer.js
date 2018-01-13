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


ЧЕЛОВЕК.hasMany(РОДСТВЕННАЯ_СВЯЗЬ, {foreignKey: 'РОДСТВЕННИК_ИД'} );
ЗАКЛЮЧЁННЫЙ.belongsTo(СТАТЬЯ,{foreignKey: 'СТАТЬЯ',as:'par_prisoner'});
УЧИТЕЛЬ.belongsTo(ЧЕЛОВЕК, {foreignKey:'ЧЕЛОВЕК_ИД',as:'human_teacher'});
ПЕРСОНАЛ.belongsTo(ЧЕЛОВЕК, {foreignKey:'ЧЕЛОВЕК_ИД',as:'human_personal'});
ЖУРНАЛ.belongsTo(ЗАКЛЮЧЁННЫЙ, {foreignKey:'ЧЕЛОВЕК_ИД',as:'prisoner_register'});
ЗАКЛЮЧЁННЫЙ.belongsTo(ЧЕЛОВЕК, {foreignKey:'ЧЕЛОВЕК_ИД',as:'human_prisoner'});
УЧИТЕЛЬ.belongsTo(ПРЕДМЕТ, {foreignKey:'ПРЕДМЕТ_ИД',as:'subject_teacher'});
ДОСРОЧНОЕ.belongsTo(ЗАКЛЮЧЁННЫЙ, {foreignKey:'ЧЕЛОВЕК_ИД',as:'release_prisoner'});
ПОСЕЩЕНИЕ.belongsTo(ЗАКЛЮЧЁННЫЙ, {foreignKey:'ЧЕЛОВЕК_ИД',as:'visit_prisoner'});
ПОСЕЩЕНИЕ.belongsTo(User, {foreignKey:'user_id',as:'visit_user'});
ЗАКЛЮЧЁННЫЙ.hasMany(РОДСТВЕННАЯ_СВЯЗЬ,  {foreignKey: 'ЧЕЛОВЕК_ИД'});
ЗАКЛЮЧЁННЫЙ.hasMany(ПОСЕЩЕНИЕ,  {foreignKey: 'ЧЕЛОВЕК_ИД'});
ПРЕДМЕТ.hasMany(УЧИТЕЛЬ,  {foreignKey: 'ПРЕДМЕТ_ИД'});
ПРЕДМЕТ.hasMany(ЖУРНАЛ, {foreignKey: 'ПРЕДМЕТ'});
УЧИТЕЛЬ.hasMany(ЖУРНАЛ,  {foreignKey: 'ЧЕЛОВЕК_ИД'});


module.sequelize = sequelize;

module.exports = () => {
    module.sync = async (arg) => {
        await sequelize.sync({
            force: arg
        });
    };

    return module;
};
