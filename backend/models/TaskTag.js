module.exports = (sequelize, type) => {
    return sequelize.define('tasktag', {
    }, { timestamps: false });
}