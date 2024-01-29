const express = require('express');
const router = express.Router();


router.get('/Water-Colour-Mediums',async (req,res)=>{
    let db = req.db;
    try{
        let docs = []
        let coll = db.collection('Painting_Medium');
        let data =  coll.find({subcat:'Water Colour Mediums'});
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

router.get('/Oil-Mediums',async (req,res)=>{
    let db = req.db;

    try{
        let docs = []
        let coll = db.collection('Painting_Medium');
        let data =  coll.find({subcat:'Oil Mediums'});
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
router.get('/Fixative-and-Varnishes',async (req,res)=>{
    let db = req.db;

    try{  let docs = []
        let coll = db.collection('Painting_Medium');
        let data = await coll.find({subcat:'Fixative and Varnishes'});
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
router.get('/Gessos-and-Grounds ',async (req,res)=>{
    let db = req.db;

    try{  
        let docs = []
        let coll = db.collection('Painting_Medium');
        let data = await coll.find({subcat:'Gessos and Grounds'});
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

router.get('/Acrylic-Auxilaries ',async (req,res)=>{
    let db = req.db;

    try{  
        let docs = []
        let coll = db.collection('Painting_Medium');
        let data = await coll.find({subcat:'Acrylic Auxilaries'});
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
        let coll = db.collection('Painting_Medium');
        let data = await coll.findOne({'id':val});
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(400).send(err);
    }


})

module.exports=router