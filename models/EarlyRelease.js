module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ДОСРОЧНОЕ', {
        ЗК_ИД: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        РОДСТВЕННИК_ИД: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        ТЕКСТ: {
            type: DataTypes.STRING
        },
        СТАТУС: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,
        freezeTableName: true
    })
};