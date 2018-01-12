module.exports = function (sequelize, DataTypes) {
    return sequelize.define('ПОСЕЩЕНИЕ', {
        ЧЕЛОВЕК_ИД: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull:false
        },
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull:false
        },
        ПОСЕЩЕНИЕ_ИД: {
            type: DataTypes.INTEGER,
            autoIncrement:true
        },

        ДАТА_ПОСЕЩЕНИЯ: {
            type: DataTypes.DATE,
            primaryKey: true,
            allowNull:false
        },
        СТАТУС: {
            type: DataTypes.BOOLEAN,
            allowNull:false,
            defaultValue:false
        }
    }, {
        timestamps: false,
        freezeTableName: true
    })
};