const { db } = require("../models/index");
const Op = db.Sequelize.Op;
const Calender = db.calender;
const User = db.user;

const create_Calender = (req, res) => {
  try {
    Calender.create({
      DayOftheweek: req.body.DayOftheweek,
      sessionDay: req.body.sessionDay,
      available: req.body.available,
      capacity: req.body.capacity,
      dayOfMonth: req.body.dayOfMonth,
      monthOfYear: req.body.monthOfYear,
      year: req.body.year,
    })
      .then((calender) => {
        res.status(200).send(calender);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Calender.",
        });
      });
  } catch (error) {
    console.log(error);
  }
};
const get_Calender = (req, res) => {
  try {
    Calender.findAll()
      .then((calender) => {
        res.status(200).send(calender);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Can't find Calender.",
        });
      });
  } catch (error) {
    res.send(error);
  }
};
const get_Calender_by_id = (req, res) => {
 try {
  Calender.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((calender) => {
      res.send(calender);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Calender.",
      });
    });
 } catch (error) {
  res.send(error);
 }
};
const get_Calender_by_month_year = (req, res) => {
  try {
    const { month, year } = req.query;
  if (!month && !year) {
    res.status(400).send({
      message: "Missing monthOfYear and year",
    });
  } else {
    Calender.findAll({
      where: {
        monthOfYear: month,
        year: year,
      },
    })
      .then((calender) => {
        if(calender.length === 0){
          res.status(404).send({
            message: "Calender is Empty",
          });
        }
        else
        {
            res.status(200).send(calender);
        }
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Calender.",
        });
      });
  }
  } catch (error) {
    res.send(error);
  }
};

const update_Calender = (req, res) => {
  try {
    Calender.update(
      {
        DayOftheweek: req.body.DayOftheweek,
        sessionDay: req.body.sessionDay,
        available: req.body.available,
        capacity: req.body.capacity,
        dayOfMonth: req.body.dayOfMonth,
        monthOfYear: req.body.monthOfYear,
        year: req.body.year,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(() => {
        res.send({
          message: "Calender was updated successfully.",
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while updating Calender.",
        });
      });
  } catch (error) {
      res.send(error);
  }
};
const delete_Calender = (req, res) => {
 try {
  Calender.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      res.send({
        message: "Calender was deleted successfully.",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting Calender.",
      });
    });
 } catch (error) {
  res.status(500).send({
    message: error.message || "Some error occurred while deleting Calender.",
  });
 }
};
module.exports = {
  create_Calender,
  get_Calender,
  get_Calender_by_id,
  update_Calender,
  delete_Calender,
  get_Calender_by_month_year,
};
