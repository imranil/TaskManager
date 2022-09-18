module.exports = (sequelize, type) => {
    return sequelize.define('tag', {
        userId: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: "id"
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        name: {
            type: type.STRING,
            allowNull: false,
        },
    });
}