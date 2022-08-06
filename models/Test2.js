// module.exports = (sequelize, Sequelize) => {
//   const Postest = sequelize.define(
//     "Postest",
//     {
//       id: {
//         type: Sequelize.UUID,
//         primaryKey: true,
//         defaultValue: Sequelize.UUIDV4,
//         allowNull: false,
//       },
//       title: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//       description: {
//         type: Sequelize.STRING,
//         allowNull: false,
//       },
//     },
//      {
//       timestamps: false,
//     //   indexes: [
//     //     {
//     //       unique: true,
//     //       fields: ["user_id"],
//     //     },
//     //   ],
//     }
//   );
//   return Postest;
// };
