module.exports = function (sequelize, DataTypes) {
    return sequelize.define('НОВОСТЬ', {
        НОВОСТЬ_ИД: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        ЗАГОЛОВОК: {
            type: DataTypes.STRING
        },
        КАРТИНКА: {
            type: DataTypes.STRING
        },
        ТЕКСТ: {
            type: DataTypes.STRING
        }
    }, {
        //timestamp - время создания, время обновления
        timestamps: false,
        //freezeTableName - sequelize пытается обзывать таблицы во множественном числе
        freezeTableName: true
    })
};