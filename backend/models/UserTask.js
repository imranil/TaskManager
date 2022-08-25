module.exports = (sequelize, type) => {
    return sequelize.define('usertask', {
        id: {
            type: type.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
    });
}