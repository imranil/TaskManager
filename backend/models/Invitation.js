module.exports = (sequelize, type) => {
    return sequelize.define('invitation', {
        senderId: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                onDelete: 'CASCADE',
                key: "id"
            }
        },
        receiverId: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                onDelete: 'CASCADE',
                key: "id"
            }
        },
        taskId: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'tasks',
                onDelete: 'CASCADE',
                key: "id"
            }
        }
    });
}