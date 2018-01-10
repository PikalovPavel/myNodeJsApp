module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ПРЕДМЕТ', {
        ПРЕДМЕТ_ИД: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        НАЗВАНИЕ: {
            type: DataTypes.STRING
        }
    }, {
        //timestamp - время создания, время обновления
        timestamps: false,
        //freezeTableName - sequelize пытается обзывать таблицы во множественном числе
        freezeTableName: true
    })
};