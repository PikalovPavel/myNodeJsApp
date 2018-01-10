


module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ЖУРНАЛ', {
        ЧЕЛОВЕК_ИД: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        ПРЕДМЕТ: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        УЧИТЕЛЬ_ИД: {
            type: DataTypes.INTEGER
        },
        КР1: {
            type: DataTypes.INTEGER
        },
        КР2: {
            type: DataTypes.INTEGER
        },
        КР3: {
            type: DataTypes.INTEGER
        },
        КР4: {
            type: DataTypes.INTEGER
        },
        ЛК: {
            type: DataTypes.INTEGER
        }
    }, {
        //timestamp - время создания, время обновления
        timestamps: false,
        //freezeTableName - sequelize пытается обзывать таблицы во множественном числе
        freezeTableName: true
    })
};