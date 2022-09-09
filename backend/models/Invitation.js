module.exports = (sequelize, type) => {
    return sequelize.define('invitation', {
        senderId: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: "id"
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        receiverId: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: "id"
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        taskId: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'tasks',
                key: "id"
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        }
    });
}