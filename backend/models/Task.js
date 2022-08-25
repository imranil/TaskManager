module.exports = (sequelize, type) => {
    return sequelize.define('task', {
        name: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: "field is required"}
            },
        },
        description: {
            type: type.TEXT,
        },
        priority: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: "field is required"}
            },
        },
        status: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: "field is required"}
            },
        },
        deadline: {
            type: type.DATEONLY,
            allowNull: false,
            validate: {
                notNull: {msg: "field is required"}
            },
        },
    });
}