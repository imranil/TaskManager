module.exports = (sequelize, type) => {
    return sequelize.define('invitation', {
        senderId: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: "id"
            }
        },
        receiverId: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: "id"
            }
        },
        taskId: {
            type: type.INTEGER,
            allowNull: false,
            references: {
                model: 'tasks',
                key: "id"
            }
        }
    });
}