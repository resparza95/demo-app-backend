import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('demoDB', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Set to true to see SQL queries
});

export default sequelize;