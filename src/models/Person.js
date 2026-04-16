const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Person = sequelize.define('Person', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: { notEmpty: true },
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    validate: { isEmail: true },
  },
  idade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: { min: 0, max: 150 },
  },
  cidade: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
}, {
  tableName: 'pessoas',
  timestamps: true,
});

module.exports = Person;
