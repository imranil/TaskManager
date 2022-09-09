module.exports = (sequelize, type) => {
    return sequelize.define('task', {
        name: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: "name is required"}
            },
        },
        description: {
            type: type.TEXT,
        },
        priority: {
            type: type.STRING,
            allowNull: false,
            validate: {
                isIn: [['low', 'medium', 'high']],
                notNull: {msg: "priority is required"}
            },
        },
        status: {
            type: type.STRING,
            allowNull: false,
            validate: {
                isIn: [['to do', 'in progress', 'closed', 'frozen']],
                notNull: {msg: "status is required"}
            },
        },
        deadline: {
            type: type.DATEONLY,
            allowNull: false,
            validate: {
                notNull: {msg: "deadline is required"}
            },
        },
    });
}