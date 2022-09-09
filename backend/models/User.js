module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        email: {
            type: type.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notNull: { msg: "field is required" }
            },
        },
        password: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "field is required" }
            },
        },
        firstName: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "field is required" }
            },
        },
        lastName: {
            type: type.STRING,
            allowNull: false,
            validate: {
                notNull: { msg: "field is required" }
            },
        },
        fullName: {
            type: type.VIRTUAL,
            get() {
                return `${this.firstName} ${this.lastName}`
            }
        },
        avatar: {
            type: type.STRING,
        }
    });
}