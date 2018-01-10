module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ПОСЕЩЕНИЕ', {
        ЧЕЛОВЕК_ИД: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull:false
        },
        РОДСТВЕННИК_ИД: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull:false
        },
        ДАТА_ПОСЕЩЕНИЯ: {
            type: DataTypes.DATE,
            primaryKey: true,
            allowNull:false
        },
        СТАТУС: {
            type: DataTypes.STRING,
            allowNull:false,
            defaultValue:"В_РАССМОТРЕНИИ"
        }
    }, {
        timestamps: false,
        freezeTableName: true
    })
};