module.exports = function (sequelize, DataTypes) {
    return sequelize.define('КАМЕРА', {
        НОМЕР_КАМЕРЫ: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        НАЗВАНИЕ_БЛОКА: {
            type: DataTypes.STRING
        },
        ТИП_КАМЕРЫ: {
            type: DataTypes.INTEGER
        },
        КОЛИЧЕСТВО_ЗАКЛЮЧЁННЫХ: {
            type: DataTypes.INTEGER
        }
    }, {
        //timestamp - время создания, время обновления
        timestamps: false,
        //freezeTableName - sequelize пытается обзывать таблицы во множественном числе
        freezeTableName: true
    })
};