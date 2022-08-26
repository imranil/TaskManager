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
                notNull: {msg: "description is required"}
            },
        },
        status: {
            type: type.STRING,
            allowNull: false,
            validate: {
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