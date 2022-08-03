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

// module.exports = {
//     HOST: "localhost",
//     PORT: 3306,
//     USER: "root",
//     PASSWORD: "",
//     DB: "calender_manager",
//     dialect: "mysql",
//     pool: {
//         max: 30,
//         min: 5,
//         acquire: 999999,
//         idle: 10000
//     },
//     timeZone: "+07:00"
// };