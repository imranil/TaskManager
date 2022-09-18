const config = require('config');
const dbConfig = config.get('dbConfig');
const Sequelize = require('sequelize');
const UserModel = require('./User');
const TaskModel = require('./Task');
const UserTaskModel = require('./UserTask');
const InvitationModel = require('./Invitation');
const TagModel = require('./Tag');
const TaskTagModel = require('./TaskTag')


const sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  dialect: dbConfig.dialect,
  host: dbConfig.host,
  pool: dbConfig.pool,
});

const User = UserModel(sequelize, Sequelize);
const Task = TaskModel(sequelize, Sequelize);
const UserTask = UserTaskModel(sequelize, Sequelize);
const Invitation = InvitationModel(sequelize, Sequelize);
const Tag = TagModel(sequelize, Sequelize);
const TaskTag = TaskTagModel(sequelize, Sequelize);

User.belongsToMany(Task, {through: UserTask});
Task.belongsToMany(User, {through: UserTask});
Tag.belongsToMany(Task, {through: TaskTag});
Task.belongsToMany(Tag, {through: TaskTag})



sequelize.sync()
  .then(() => {
    console.log(`Database connected!`)
  })

module.exports = {
  User,
  Task,
  UserTask, 
  Invitation,
  Tag,
  TaskTag,
  sequelize
}