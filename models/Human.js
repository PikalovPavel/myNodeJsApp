module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ЧЕЛОВЕК', {
        ЧЕЛОВЕК_ИД: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        ИМЯ: {
            type: DataTypes.STRING,
            allowNull:false
        },
        ФАМИЛИЯ: {
            type: DataTypes.STRING,
            alowNull:false
        },
        ОТЧЕСТВО: {
            type: DataTypes.STRING,
            allowNull:true
        },
        Дата_Рождения: {
            type: DataTypes.DATE,
            allowNull:false
        },
        ПОЛ: {
            type: DataTypes.STRING,
            allowNull:false
        },
        РОЛЬ: {
            type: DataTypes.STRING,
            allowNull:false
        },
        ПАРОЛЬ: {
            type: DataTypes.STRING,
            allowNull:true
        },
    }, {
        timestamps: false,
        freezeTableName: true
    })
};