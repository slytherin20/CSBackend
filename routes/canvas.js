const express = require('express');
const router = express.Router();


router.get('/Canvas-Boards',async (req,res)=>{
    let db = req.db;
    try{
        let docs = []
        let coll = db.collection('Canvas');
        let data =  coll.find({subcat:'Canvas Boards'});
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

router.get('/Canvas-Rolls',async (req,res)=>{
    let db = req.db;

    try{
        let docs = []
        let coll = db.collection('Canvas');
        let data =  coll.find({subcat:'Canvas Rolls'});
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
router.get('/Stretched-Canvas',async (req,res)=>{
    let db = req.db;

    try{  let docs = []
        let coll = db.collection('Canvas');
        let data = await coll.find({subcat:'Stretched Canvas'});
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
        let coll = db.collection('Canvas');
        let data = await coll.findOne({'id':val});
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }


})

module.exports=router