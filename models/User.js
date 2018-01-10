module.exports = function (sequelize, DataTypes) {
    return sequelize.define('User', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(20),
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        role: {
            type:DataTypes.STRING(30),
            defaultValue:"USER"
        }

    }, {
        //timestamp - время создания, время обновления
        timestamps: false,
        //freezeTableName - sequelize пытается обзывать таблицы во множественном числе
        freezeTableName: true
    })
};