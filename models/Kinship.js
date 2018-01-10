module.exports = function (sequelize, DataTypes) {
    return sequelize.define('РОДСТВЕННАЯ_СВЯЗЬ', {
        ЧЕЛОВЕК_ИД: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        РОДСТВЕННИК_ИД: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        СВЯЗЬ: {
            type: DataTypes.STRING
        }
    }, {
        //timestamp - время создания, время обновления
        timestamps: false,
        //freezeTableName - sequelize пытается обзывать таблицы во множественном числе
        freezeTableName: true
    })
};