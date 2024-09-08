'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favourite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Favourite.belongsTo(models.User, { foreignKey: 'userId' });
        Favourite.belongsTo(models.Hero, { foreignKey: 'heroId' });

    }
  }
  Favourite.init({
    heroId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'Heros',
        key:'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      references:{
        model:'Users',
        key:'id'
      },
      onUpdate:'CASCADE',
      onDelete:'CASCADE'
    },
    role: {
      type:DataTypes.STRING,
      allowNull:false,
      defaultValue:'-'
    },
    power: {
      type:DataTypes.INTEGER,
      allowNull:false,
      defaultValue:0
    }
  }, {
    sequelize,
    modelName: 'Favourite',
  });
  return Favourite;
};