
const Calender = (sequelize, Sequelize) => {
    //get ngày trong tuần
const getDayOfWeek = (day) => {
    switch (day) {
      case 0:
        return "Chủ nhật";
      case 1:
        return "Thứ hai";
      case 2:
        return "Thứ ba";
      case 3:
        return "Thứ tư";
      case 4:
        return "Thứ năm";
      case 5:
        return "Thứ sáu";
      case 6:
        return "Thứ bảy";
      default:
        return "";
    }}

  const Calender = sequelize.define("calender", {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1,
      allowNull: false,
    },
    DayOftheweek: {
      //Ngày trong tuần
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: getDayOfWeek(new Date().getDay()),
    },
    sessionDay: {
      //buổi (sáng chiều tối)
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: new Date().getHours() + ":" + new Date().getMinutes() + ":"+ new Date().getSeconds(),
    },
    available: {
      //Có thể đăng ký hay không
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
    capacity: {
      //Số lượng học sinh tối đa
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 30,
    },
    dayOfMonth: {
      //Ngày trong tháng
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: new Date().getDate(),
    },
    monthOfYear: {
      // Tháng trong năm
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: new Date().getMonth()+1,
    },
    year: {
        //Năm
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: new Date().getFullYear(),
    }
  });
  return Calender;
};
module.exports = { Calender };
