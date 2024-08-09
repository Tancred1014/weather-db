'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class WeatherCache extends Model {
    static associate(models) {
      // 定義關聯
    }
  }
  WeatherCache.init({
    city: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('data');
        return rawValue ? JSON.parse(rawValue) : null;
      },
      set(value) {
        this.setDataValue('data', JSON.stringify(value));
      }
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  }, {
    sequelize,
    modelName: 'WeatherCache',
    tableName: 'weather_caches',
    timestamps: true
  });
  return WeatherCache;
};