module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ТИП_КАМЕРЫ', {
        ИД_ТИПА: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull:false
        },
        НАЗВАНИЕ_ТИПА: {
            type: DataTypes.STRING,
            allowNull:false
        },
        ВМЕСТИМОСТЬ: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        ПЛОЩАДЬ: {
            type: DataTypes.INTEGER,
            allowNull:false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    })
};