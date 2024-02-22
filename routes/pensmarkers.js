const express = require('express');
const router = express.Router();
const { getAuth } = require('firebase-admin/auth');

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
router.put('/:id',async (req,res)=>{
    let updatedCount = req.body.cartCount;
    let status = req.body.status;
    let id = Number(req.params.id);
    let db = req.db;
    let tokenId = req.body.tokenId;
    try{
        let decodedToken = await getAuth().verifyIdToken(tokenId);
        if(!decodedToken.uid) {
            res.status(403).send("Forbidden user");
        }
        let coll = db.collection('Pens_and_Markers');
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
        let coll = db.collection('Pens_and_Markers');
        await coll.insertOne(details);
        res.status(200).send('Document inserted!')
    }
    catch(err){
        console.log(err);
        res.status(400).send(err)
    }
})
module.exports=router