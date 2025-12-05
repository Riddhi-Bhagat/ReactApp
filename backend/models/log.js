"use strict";

module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define("Log", {
    login_time: DataTypes.DATE,
  });

  return Log;
};
