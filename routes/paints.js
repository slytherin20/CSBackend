const express = require('express');
const router = express.Router();
const { getAuth } = require('firebase-admin/auth');

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
router.put('/:id',async (req,res)=>{
    let db = req.db;
    let updatedCount = req.body.cartCount;
    let status = req.body.status;
    let id = Number(req.params.id);
    let tokenId = req.body.tokenId;
    try{
        let decodedToken = await getAuth().verifyIdToken(tokenId);
        if(!decodedToken.uid) {
            res.status(403).send("Forbidden user");
        }
        let coll = db.collection('Paints');
        await coll.updateOne({'id':id},{$set:{'count':updatedCount,'status':status }});
        res.status(200).send("Document updated successfully!");
    }
    catch(err){
        console.log(err);
        res.status(400).send(err)
    }
})
router.post('/',async (req,res)=>{
    let db = req.db;
    let details = req.body.details;
    let tokenId = req.body.tokenId;
    try{
        let decodedToken = await getAuth().verifyIdToken(tokenId);
        if(decodedToken.uid!==process.env.ADMIN_UID) {
            res.status(403).send("Forbidden user");
        }
        let coll = db.collection('Paints');
        await coll.insertOne(details);
        res.status(200).send('Document inserted!')
    }
    catch(err){
        console.log(err);
        res.status(400).send(err)
    }
})
module.exports=router