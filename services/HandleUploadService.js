const multer = require('multer');
const path = require('path');
const { memoryStorage } = require('multer');
const { storageFire, defaultAppConfig } = require('../config/firebase');
const { hashSync, compareSync } = require('bcryptjs');
const Mluter = multer({
    storage: memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 5
    },

})
const uploadImageFirestore = (req, res, next) => {
    const image = req.file;
    if (!image) {
        return res.status(400).send({
            message: "No file uploaded!"
        });
    }


    const filename = req.userId + path.extname(image.originalname);
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimeType = fileTypes.test(filename);
    const extname = fileTypes.test(path.extname(image.originalname));
    //delete "." from path.extname(image.originalname)
    const ext = path.extname(image.originalname).replace(".", "");
    console.log(ext);

    const file = storageFire.file(filename);

    if (mimeType && extname) {
        //delete file before upload
        storageFire.deleteFiles({
            prefix: req.userId
        }).then(() => {
            // upload file
            file.createWriteStream({
                metadata: {
                    contentType: `image/${ext}`,
                }
            }).on('error', err => {
                console.log(err);
            }).on('finish', async () => {
                await file.makePublic();
                req.file.firebaseUrl = `https://storage.googleapis.com/${defaultAppConfig.storageBucket}/${file.name}`;
                next();
            }).end(image.buffer);
        })

    }
    // //check file if exist then delete
    // file.getMetadata().then(metadata => {
    //     metadata.forEach(item => {
    //         if(item.name.slice(0,-4)===filename.slice(0,-4))
    //         {

    //             file.delete();   
    //         }
    //         // console.log("Item .name trong foreacg",item.name.slice(0, -4));
    //         // if(item.name.slice(0,-4)===req.userId){
    //         //     flag=true;
    //         //     file.delete();
    //         //     console.log("flag true");
    //         // }
    //     })

    //     // const nameMetadata = metadata[0].name.slice(0, -4);
    //     // const fileNameOld = filename.slice(0, -4);

    //     // if (nameMetadata === fileNameOld) {
    //     //     console.log(nameMetadata + " === " + fileNameOld);
    //     //     file.delete().then(() => {
    //     //         file.createWriteStream({
    //     //             metadata: {
    //     //                 contentType: `image/${ext}`,
    //     //             }
    //     //         }).on('error', err => {
    //     //             console.log(err);
    //     //         }).on('finish', async () => {
    //     //             await file.makePublic();
    //     //             req.file.firebaseUrl = `https://storage.googleapis.com/${defaultAppConfig.storageBucket}/${file.name}`;
    //     //             next();
    //     //         }).end(image.buffer);
    //     //     }).catch(err => {
    //     //         console.log(err);
    //     //     });
    //     // }
    // }).catch(() => {
    //     file.createWriteStream({
    //         metadata: {
    //             contentType: `image/${ext}`,
    //         }
    //     }).on('error', err => {
    //         console.log(err);
    //     }).on('finish', async () => {
    //         await file.makePublic();
    //         req.file.firebaseUrl = `https://storage.googleapis.com/${defaultAppConfig.storageBucket}/${file.name}`;
    //         next();
    //     }).end(image.buffer);
    // })

    else {
        return res.status(400).send({
            message: "Images Only!"
        });
    }
    // const stream = file.createWriteStream({
    //     metadata: {
    //         contentType: "image/png"
    //     },

    // });
    // stream.on("error", (err) => {
    //     console.log(err)
    //     res.status(500).send({
    //         message: err.message
    //     });
    // })
    // stream.on("finish", async () => {
    //     await file.makePublic();
    //     req.file.firebaseUrl = `https://storage.googleapis.com/${defaultAppConfig.storageBucket}/${file.name}`;
    //     next();
    // })
    // stream.end(image.buffer);


}

module.exports = {
    Mluter, uploadImageFirestore
}