module.exports = (sequelize, type) => {
    return sequelize.define('usertask', {
        role: {
            type: type.STRING,
            validate: {
                isIn: [['creator', 'contributor']]
            }
        }
    }, { timestamps: false });
}