const config = require("../config/config.js");
const Sequelize = require("sequelize");
const { calender, Calender } = require("./calender.model.js")
const { reg_calender, Reg_Calender } = require("./reg_calender.model.js")
const sequelize = new Sequelize({
  host:config.HOST,
  port:config.PORT,
  username:config.USER,
  password:config.PASSWORD,
  database:config.DB,
  dialect:config.dialect,
  pool: {
    max: 30,
    min: 5,
    acquire: 0,
    idle: 10000
  },
}
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model.js")(sequelize, Sequelize);
// db.role = require("./role.model.js")(sequelize, Sequelize);
db.calender = Calender(sequelize, Sequelize);
db.reg_calender = Reg_Calender(sequelize, Sequelize);
//1 reg_calender has one calender and one user

db.user.hasMany(db.reg_calender, { foreignKey: "user_id" });
db.reg_calender.belongsTo(db.user,
  { foreignKey: "user_id" });

db.calender.hasMany(db.reg_calender, { foreignKey: "calender_id" });
db.reg_calender.belongsTo(db.calender,
  { foreignKey: "calender_id" });
module.exports = { db };