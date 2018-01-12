module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ДОСРОЧНОЕ', {
        ЗАЯВЛЕНИЕ_ИД:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ЧЕЛОВЕК_ИД: {
            type: DataTypes.INTEGER,

        },
        ТЕКСТ: {
            type: DataTypes.STRING
        },
        СТАТУС: {
            type: DataTypes.BOOLEAN,
            defaultValue:false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    })
};