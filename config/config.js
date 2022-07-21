module.exports = {
    DB_HOST: "103.121.91.135",
    PORT: 3306,
    USER: "lab",
    PASSWORD: "tuanadmin",
    DB: "test",
    dialect: "mysql",
    pool: {
        max: 999,
        min: 3,
        acquire: 30000,
        idle: 10000
    },
    timeZone: "+07:00"
};