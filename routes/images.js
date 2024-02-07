const dotenv = require('dotenv');
dotenv.config()
const cloudinary = require('cloudinary').v2;
const router = require('express').Router()
const multer = require('multer');

const upload = multer({'dest':'uploads/'});

router.post('/',upload.single('file'),async (req,res)=>{
    let img = req.file;
    try{

        let data = await cloudinary.uploader.upload(img.path);
        res.status(200).json({"public_id":data.public_id})
    }
    catch(err){
        console.log(err)
        res.status(err.http_code).json({"details":err})
    }
});

router.get('/:id',async (req,res)=>{
    let id= req.params.id;
    try{

        let img = await cloudinary.api.resource(id);
        res.status(200).send(img)
    }
    catch(err){
        console.log(err);
        res.status(err.http_code).send(err.message);
    }
})

module.exports = router;