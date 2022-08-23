module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        email: {
            type: type.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {msg: "field is required"}
            },
        },
        password: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: "field is required"}
            },
        },
        firstName: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: "field is required"}
            },
        },
        lastName: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notNull: {msg: "field is required"}
            },
        },
        avatar: {
            type: type.STRING,
            allowNull: true
        }
    });
}