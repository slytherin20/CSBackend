const express = require('express');
const router = express.Router();


router.get('/Acrylic-Brushes',async (req,res)=>{
    let db = req.db;
    try{
        let docs = []
        let coll = db.collection('Brushes');
        let data =  coll.find({subcat:'Acrylic Brushes'});
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

router.get('/Oil-Brushes',async (req,res)=>{
    let db = req.db;

    try{
        let docs = []
        let coll = db.collection('Brushes');
        let data =  coll.find({subcat:'Oil Brushes'});
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
router.get('/Water-Brushes',async (req,res)=>{
    let db = req.db;

    try{  let docs = []
        let coll = db.collection('Brushes');
        let data = await coll.find({subcat:'Water Brushes'});
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
        let coll = db.collection('Brushes');
        let data = await coll.findOne({'id':val});
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }


})

module.exports=router