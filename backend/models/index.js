const config = require('config');
const dbConfig = config.get('dbConfig');
const Sequelize = require('sequelize');
const UserModel = require('./User');


const sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
  dialect: dbConfig.dialect,
  host: dbConfig.host,
  pool: dbConfig.pool,
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync()
  .then(() => {
    console.log(`Database connected!`)
  })

module.exports = {
  User
}