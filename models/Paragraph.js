module.exports = function (sequelize, DataTypes) {
    return sequelize.define('СТАТЬЯ', {
        НОМЕР_СТАТЬИ: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        СРОК: {
            type: DataTypes.INTEGER
        },
        ОБРАТНАЯ_СИЛА: {
            type: DataTypes.BOOLEAN
        }
    }, {
        //timestamp - время создания, время обновления
        timestamps: false,
        //freezeTableName - sequelize пытается обзывать таблицы во множественном числе
        freezeTableName: true
    })
};