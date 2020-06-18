const {Sequelize} = require('sequelize');

module.exports.createStore = () => {
  const db = new Sequelize({
    dialect: 'sqlite',
    storage: './store.sqlite'
  });

  const toDos = db.define('user', {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    title: Sequelize.STRING,
  });

  return { db, toDos };
};
