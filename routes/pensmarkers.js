const express = require('express');
const router = express.Router();


router.get('/Acrylic-Markers',async (req,res)=>{
    let db = req.db;
    try{
        let docs = []
        let coll = db.collection('Pens_and_Markers');
        let data =  coll.find({subcat:'Acrylic Markers'});
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

router.get('/Pigment-Liners',async (req,res)=>{
    let db = req.db;

    try{
        let docs = []
        let coll = db.collection('Pens_and_Markers');
        let data =  coll.find({subcat:'Pigment Liners'});
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
router.get('/Twin-Tip-Markers',async (req,res)=>{
    let db = req.db;

    try{  let docs = []
        let coll = db.collection('Pens_and_Markers');
        let data = await coll.find({subcat:'Twin Tip Markers'});
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
router.get('/Brush-Pens',async (req,res)=>{
    let db = req.db;

    try{  let docs = []
        let coll = db.collection('Pens_and_Markers');
        let data = await coll.find({subcat:'Brush Pens'});
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
        let coll = db.collection('Pens_and_Markers');
        let data = await coll.findOne({'id':val});
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }


})

module.exports=router