module.exports = function (sequelize, DataTypes) {
    return sequelize.define('УЧИТЕЛЬ', {
        ЧЕЛОВЕК_ИД: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ПРЕДМЕТ_ИД: {
            type: DataTypes.INTEGER,
            primaryKey: true
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