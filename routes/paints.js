const express = require('express');
const router = express.Router();


router.get('/Acrylics',async (req,res)=>{
    let db = req.db;
    try{
        let docs = []
        let paintsColl = db.collection('Paints');
        let data =  paintsColl.find({subcat:'Acrylics'});
        for await (let doc of data){
            docs.push(doc)
        }
        res.status(200).json(docs)
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }

})

router.get('/Spray-Paints',async (req,res)=>{
    let db = req.db;

    try{
        let docs = []
        let paintsColl = db.collection('Paints');
        let data =  paintsColl.find({subcat:'Spray Paints'});
        for await (let doc of data){
            docs.push(doc)
        }
        res.status(200).json(docs)
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }

})
router.get('/Oil-Colours',async (req,res)=>{
    let db = req.db;

    try{  let docs = []
        let paintsColl = db.collection('Paints');
        let data = await paintsColl.find({subcat:'Oil Colours'});
        for await (let doc of data){
            docs.push(doc)
        }
        res.status(200).json(docs)
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }

})
router.get('/Water-Colours',async (req,res)=>{
    let db = req.db;

    try{  let docs = []
        let paintsColl = db.collection('Paints');
        let data = await paintsColl.find({subcat:'Water Colours'});
        for await (let doc of data){
            docs.push(doc)
        }
        res.status(200).json(docs)
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }

})
router.get('/:id',async (req,res)=>{
    let db = req.db;
    let val = Number(req.params.id);
    try{
        let paintsColl = db.collection('Paints');
        let data = await paintsColl.findOne({'id':val});
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }


})

module.exports=router