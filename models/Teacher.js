module.exports = function (sequelize, DataTypes) {
    return sequelize.define('УЧИТЕЛЬ', {
        ЧЕЛОВЕК_ИД: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        ПРЕДМЕТ: {
            type: DataTypes.INTEGER
        },
        БЛОК: {
            type: DataTypes.STRING
        }
    }, {
        //timestamp - время создания, время обновления
        timestamps: false,
        //freezeTableName - sequelize пытается обзывать таблицы во множественном числе
        freezeTableName: true
    })
};