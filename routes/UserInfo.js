const router = require('express').Router();
const { getAuth } = require('firebase-admin/auth');

router.get('/',async(req,res)=>{
    
    let db = req.db;
    let authHeader = req.headers['authorization'];
    try{
        let decodedToken;
        if(authHeader){
            let tokenId = authHeader.substring(7);
            decodedToken = await getAuth().verifyIdToken(tokenId);
            if(!decodedToken.uid){
                res.status(403).send('Forbidden User');
            }
        }
        else res.status(401).send('Unauthorized request send');
        let coll = await db.collection('UserInfo');
        let result = await coll.findOne({'uid':decodedToken.uid});
        res.status(200).json(result)
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})

router.post('/',async(req,res)=>{
    let db = req.db;
    let tokenId = req.body.tokenId;
    let details = req.body.details;
    try{
        let decodedToken = await getAuth().verifyIdToken(tokenId);
        if(!decodedToken.uid){
            res.status(403).send('Forbidden User')
        }
        let coll = await db.collection('UserInfo');
            await coll.insertOne({
                'uid': decodedToken.uid,
                details
            });
        
        res.status(200).send("Address Added");
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})
router.put('/',async(req,res)=>{
    let db = req.db;
    let tokenId = req.body.tokenId;
    let details = req.body.details;
    try{
        let decodedToken = await getAuth().verifyIdToken(tokenId);
        if(!decodedToken.uid){
            res.status(403).send('Forbidden User')
        }
        let coll = await db.collection('UserInfo');
        await coll.updateOne({'uid':decodedToken.uid},{$set:{'details':details}})
        res.status(200).send("Address Updated");
    }
    catch(err){
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})


module.exports = router