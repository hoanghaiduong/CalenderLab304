const { authJwt } = require('../middleware');
const { getAllUser, getUserById, deleteUser, getUserRegCaledar, createUser, get_Calender_available, userUploadAvatar, uploadAvatar, sendMail } = require("../controllers/user.controller")
const express = require('express');
const { db } = require('../models');
const { updateUser } = require('../controllers/authFirebase.controller');
const { verifyTokenFirebase, isAdminFirebase } = require('../middleware/firebaseMDL');
const { uploadImageFirestore, Mluter } = require('../services/HandleUploadService');
const { storageFire } = require('../config/firebase');
const router = express.Router();
const User = db.user;

router.get('/getAllUser', isAdminFirebase, getAllUser);
router.get('/getUserById/:uid', isAdminFirebase, getUserById);
router.get('/getUserRegCaledar', verifyTokenFirebase, getUserRegCaledar);
router.get(
    '/get_Calender_available', get_Calender_available
);
// router.get('/test',(req,res)=>{
//     console.log(req.body.urlImage);
//     const file = storageFire.file(req.body.urlImage);
//    //get file if it exists
//     //check file if it exists then return true delete file old
//     //else return false
  
//     file.exists().then(async (data) => {
//         if (data) {
//             res.status(200).json({
//                 message: "File exists!"
//             });
//         }
//         else {
//             res.status(400).json({
//                 message: "File not exists!"
//             });
//         }
//     }
//     ).catch(err => {
//         res.status(500).json({
//             message: err.message
//         });
//     }
//     );
      
// } )
router.post('/sendMail',sendMail);
router.post('/upload-avatar-user',
    [
        Mluter.single('image'),
        verifyTokenFirebase,
        uploadImageFirestore,
        
    ],
    userUploadAvatar)
//create user
router.post("/createUser", createUser);
/*Edit user */
router.put("/edit/:uid", verifyTokenFirebase, updateUser);
/*Delete User*/
router.delete("/delete/:uid", isAdminFirebase, deleteUser);


module.exports = router 