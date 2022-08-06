const config = require("../config/config.js");
const Sequelize = require("sequelize");
const { calender, Calender } = require("./calender.model.js");
const { reg_calender, Reg_Calender } = require("./reg_calender.model.js");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.DB_HOST,
  dialect: config.dialect,
  port: config.PORT,
  operatorsAliases: 0,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
  timezone: config.timeZone,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model.js")(sequelize, Sequelize);

// db.usertest = require("./Test1.js")(sequelize, Sequelize);
// db.postest = require("./Test2.js")(sequelize, Sequelize);

// db.role = require("./role.model.js")(sequelize, Sequelize);
db.calender = Calender(sequelize, Sequelize);
db.reg_calender = Reg_Calender(sequelize, Sequelize);

// db.usertest.hasOne(db.postest, {
//   foreignKey: "user_id",
//   unique: true,
// });
// db.postest.belongsTo(db.usertest, {
//   foreignKey: "user_id",
//   unique: true,
// });
//1 reg_calender has one calender and one user
// db.usertest
//   .create({
//     name: "tuan",
//   })
//   .then((user) => {
//     console.log(user.toJSON());
//   });
// db.postest.create({
//   title: "title",
//   description: "description",
//   user_id: "22827e9f-a111-4e27-999b-a2bf6e2c014d",
// }).then((postest) => {
//   console.log(postest.toJSON());
// }
// ).catch((err) => {
//   console.log(err);
// }
// );

db.user.hasMany(db.reg_calender, { foreignKey: "user_id" });
db.reg_calender.belongsTo(db.user, { foreignKey: "user_id" });

db.calender.hasMany(db.reg_calender, { foreignKey: "calender_id" });
db.reg_calender.belongsTo(db.calender, { foreignKey: "calender_id" });
module.exports = { db };
