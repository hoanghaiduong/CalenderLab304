const { db } = require("../models/index");
const User = db.user;
const Reg_Calender = db.reg_calender;
const Calender = db.calender;
const Op = db.Sequelize.Op;
var bcrypt = require("bcryptjs");
const {
  defaultApp,
  storageFire,
  defaultAppConfig,
} = require("../config/firebase");
const multer = require("multer");
const path = require("path");
const nodeMailer = require("nodemailer");
const firebaseAdmin = defaultApp.auth();

const sendMail = (req, res) => {
  const { email, subject, text, html } = req.body;
  if (!email || !subject || !text || !html) {
    res.status(400).send({
      message: "Missing parameters in request body",
    });
  } else {
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: true,

      auth: {
        user: "hoanghaiduong1711",
        pass: "oysgpdcgcujpmoua",
      },
    });
    /*👻*/
    transporter.sendMail(
      {
        from: "hoanghaiduong1711@gmail.com", // sender address
        to: email, // list of receivers
        subject:subject, // Subject line
        text: text, // plain text body
        html:html, // html body
      },
      (err, info) => {
        if (err) {
          res.status(500).send({
            message: err.message,
          });
        } else {
          res.status(200).send({
            message: `Send mail successfully 👻👻👻 -> ${email} !`,
            info: info,
          });
        }
      }
    );
  }
};
const createUser = (req, res) => {
  // Validate request
  try {
    const { uid } = req.query;
    if (!uid) {
      res.status(400).send({
        message: "User ID is required",
      });
    } else {
      User.findOne({
        where: {
          uid: uid,
        },
      }).then((user) => {
        if (user) {
          res.status(200).send({
            message: "User already exists.",
          });
        } else {
          User.create({
            uid: uid,
            displayName: req.body.displayName,
            email: req.body.email,
            photoURL: req.body.photoURL,
            phoneNumber: req.body.phoneNumber,
          })
            .then((user) => {
              res.status(201).json({
                message: "User was created successfully!",
                user: user,
              });
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  "Error creating user: Checking email has been already used",
              });
            });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const getUserById = (req, res) => {
  //findone by uuid
  User.findOne({
    where: {
      uid: req.params.uid,
    },
  })
    .then((user) => {
      if (user) {
        firebaseAdmin.getUser(req.params.uid).then((user) => {
          if (user) {
            res.status(200).json({
              message: "Get User Successfully!",
              data: user,
            });
          } else {
            res.status(400).send({
              message: "User NOT FOUND.",
            });
          }
        });
      } else {
        res.status(400).send({
          message: "User was not found.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

const getAllUser = (req, res) => {
  User.findAll()
    .then((user) => {
      res.status(200).json({
        message: "Get all user successfully!",
        data: user,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

const deleteUser = (req, res) => {
  const uid = req.params.uid;
  firebaseAdmin
    .deleteUser(uid)
    .then(() => {
      User.findOne({
        where: {
          uid: uid,
        },
      }).then((user) => {
        if (user) {
          User.destroy({
            where: {
              uid: uid,
            },
          })
            .then(() => {
              res.status(200).json({
                message: "Delete User Successfully!",
              });
            })
            .catch((err) => {
              res.status(500).send({
                message:
                  err.message || "Some error occurred while deleting User.",
              });
            });
        } else {
          res.status(400).send({
            message: "User NOT FOUND.",
          });
        }
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while deleting User.",
      });
    });
};
const get_Calender_available = (req, res) => {
  Calender.findAll({
    where: {
      available: true,
    },
  }).then((calender) => {
    res.status(200).json({
      message: "Get all calender successfully!",
      data: calender,
    });
  });
};
//người dùng xem lại những lịch mình đăng kí
const getUserRegCaledar = (req, res) => {
  User.findByPk(req.userId)
    .then((user) => {
      if (user) {
        Reg_Calender.findAll({
          where: {
            user_id: req.userId,
          },
          include: [
            {
              model: Calender,
              attributes: [
                "id",
                "DayOftheweek",
                "SessionDay",
                "available",
                "capacity",
              ],
            },
            {
              model: User,
              attributes: [
                "uid",
                "displayName",
                "email",
                "phoneNumber",
                "photoURL",
              ],
            },
          ],
        })
          .then((reg_calender) => {
            res.status(200).json({
              message: "Get User Reg Calender  Successfully!",
              data: reg_calender,
            });
          })
          .catch((err) => {
            res.status(500).send({
              message: err.message,
            });
          });
      } else {
        res.status(400).send({
          message: "User was not found.",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};
const stroage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/avatar");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const uploadAvatar = multer({
  storage: stroage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: function (req, file, cb) {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb("Error: Images Only!");
  },
}).single("avatar");

const userUploadAvatar = (req, res) => {
  if (req.file) {
    console.log(req.file.firebaseUrl);
    User.findByPk(req.userId)
      .then((user) => {
        if (user) {
          User.update(
            {
              photoURL: req.file.firebaseUrl,
            },
            {
              where: {
                uid: req.userId,
              },
            }
          )
            .then(() => {
              res.status(200).json({
                message: "Upload Avatar Successfully!",
              });
            })
            .catch((err) => {
              res.status(500).send({
                message: err.message,
              });
            });
        } else {
          res.status(400).send({
            message: "User was not found.",
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message,
        });
      });
  }
};
module.exports = {
  getAllUser,
  deleteUser,
  getUserRegCaledar,
  createUser,
  getUserById,
  get_Calender_available,
  uploadAvatar,
  userUploadAvatar,
  sendMail,
};
