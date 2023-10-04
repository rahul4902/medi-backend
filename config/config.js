// config/config.js
module.exports = {
  development: {
    username: "root",
    password: "",
    database: "meditest",
    host: "localhost",
    dialect: "mysql", // or your preferred database dialect
  },
  migrationStorage: "sequelize", // If not specified, add this line
  migrationStoragePath: "sequelize_meta.json", // If not specified, add this line
  migrations: {
    directory: "./migrations", // Check this path, adjust accordingly
  },
};
