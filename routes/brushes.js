const express = require('express');
const router = express.Router();
const { getAuth}= require('firebase-admin/auth');

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

router.put('/:id',async (req,res)=>{   //by a signed in user
    let db = req.db;
    let updatedCount = req.body.cartCount;
    let id = Number(req.params.id);
    let tokenId = req.body.tokenId;
    try{
        let decodedToken = await getAuth().verifyIdToken(tokenId);
        if(!decodedToken.uid) {
            res.status(403).send("Forbidden user");
        }
        let coll = db.collection('Brushes');
        await coll.updateOne({'id':id},{$set:{'count':Number(updatedCount.count),'status':updatedCount.status }});
        res.status(200).send("Document updated successfully!");
    }
    catch(err){
        console.log(err);
        res.status(400).send(err)
    }
})
router.post('/',async (req,res)=>{  //admin
    let db = req.db;
    let details = req.body.details;
    let tokenId = req.body.tokenId;
    try{
        let decodedToken = await getAuth().verifyIdToken(tokenId);
        if(decodedToken.uid!==process.env.ADMIN_UID) {
            res.status(403).send("Forbidden user");
        }
        let coll = db.collection('Brushes');
        await coll.insertOne(details);
        res.status(200).send('Document inserted!')
    }
    catch(err){
        console.log(err);
        res.status(400).send(err)
    }
})
module.exports=router