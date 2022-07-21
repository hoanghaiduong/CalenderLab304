module.exports = {
    HOST: "103.121.91.135",
    PORT: 3306,
    USER: "lab",
    PASSWORD: "tuanadmin",
    DB: "test",
    dialect: "mysql",
    pool: {
        max: 9999,
        min: 0,
        acquire: 999999,
        idle: 10000
    },
    timeZone: "+07:00"
};