module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ЗАКЛЮЧЁННЫЙ', {
        ЧЕЛОВЕК_ИД: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        СТАТЬЯ: {
            type: DataTypes.STRING
        },
        СРОК: {
            type: DataTypes.INTEGER
        },
        НОМЕР_КАМЕРЫ: {
            type: DataTypes.INTEGER
        }
    }, {
        //timestamp - время создания, время обновления
        timestamps: false,
        //freezeTableName - sequelize пытается обзывать таблицы во множественном числе
        freezeTableName: true
    })
};