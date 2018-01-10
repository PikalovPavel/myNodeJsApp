module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ПЕРСОНАЛ', {
        ЧЕЛОВЕК_ИД: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        ДАТА_НАЧАЛА_РАБОТЫ: {
            type: DataTypes.DATE
        },
        ПРОФЕССИЯ: {
            type: DataTypes.STRING
        }
    }, {
        //timestamp - время создания, время обновления
        timestamps: false,
        //freezeTableName - sequelize пытается обзывать таблицы во множественном числе
        freezeTableName: true
    })
};