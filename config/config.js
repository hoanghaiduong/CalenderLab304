module.exports = {
    HOST: "103.121.91.135",
    PORT: 3306,
    USER: "lab",
    PASSWORD: "tuanadmin",
    DB: "calender_manager",
    dialect: "mysql",
    pool: {
        max: 30,
        min: 5,
        acquire: 999999,
        idle: 10000
    },
    timeZone: "+07:00"
};