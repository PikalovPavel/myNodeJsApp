module.exports = function (sequelize, DataTypes) {
    return sequelize.define('БЛОК', {
        ИД_Блока: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        ВМЕСТИМОСТЬ: {
            type: DataTypes.INTEGER
        },
        НАЗНАЧЕНИЕ: {
            type: DataTypes.STRING
        }
    }, {
        //timestamp - время создания, время обновления
        timestamps: false,
        //freezeTableName - sequelize пытается обзывать таблицы во множественном числе
        freezeTableName: true
    })
};