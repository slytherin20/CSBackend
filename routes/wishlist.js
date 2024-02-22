const { getAuth } = require('firebase-admin/auth');

const router = require('express').Router();

router.get('/:id',async(req,res)=>{
    let id = req.params.id;
    let authHeader = req.headers['authorization'];
    let db = req.db;
    try{
        let decodedToken;
        if(authHeader){
            let tokenId = authHeader.substring(7)
            decodedToken = await getAuth().verifyIdToken(tokenId);
            if(!decodedToken.uid) {
                res.status(403).send("Forbidden user");
            }
        }
        else{
            res.status(401).send('UnAuthorized Request sent')
        }
        let coll = await db.collection('Wishlist');
        let doc = await coll.findOne({'uid':decodedToken.uid});
        if(doc){
            let item=doc.wishlist.find(obj=> obj.productId==id);
            if(item)
            res.status(200).json(item);
            else  res.status(200).json(null);
        }
        else{
            res.status(404).send('Not Found');
        }
        
    }
catch(err){
    console.log(err)
    res.status(500).send('Internal Server Error');
}
})
router.get('/',async(req,res)=>{
    let authHeader = req.headers['authorization'];
    let db = req.db;
    try{
        let decodedToken;
        if(authHeader){
            let tokenId = authHeader.substring(7)
             decodedToken = await getAuth().verifyIdToken(tokenId);
            if(!decodedToken.uid) {
                res.status(403).send("Forbidden user");
            }
        }
        else{
            res.status(401).send('UnAuthorized Request sent')
        }
        let coll = await db.collection('Wishlist');
        let doc = await coll.findOne({'uid':decodedToken.uid});
        res.status(200).json(doc);
    }
catch(err){
    console.log(err)
    res.status(500).send('Internal Server Error');
}
})


router.post('/',async (req,res)=>{
    let db = req.db;
    let item = req.body.item;
    let tokenId = req.body.tokenId;
    try{
        let decodedToken = await getAuth().verifyIdToken(tokenId);
        if(!decodedToken.uid) {
            res.status(403).send("Forbidden user");
        }
        let coll = await db.collection('Wishlist');
        let doc = await coll.findOne({'uid':decodedToken.uid});
        if(doc)
        await coll.updateOne({'uid':decodedToken.uid},{$push:{'wishlist':item}})
        else if(item)
        await coll.insertOne({ 'uid':decodedToken.uid,
    'wishlist':[item]
    });
    else 
    await coll.insertOne({ 'uid':decodedToken.uid,
    'wishlist':[]
    });
    res.status(200).send('Item insered')
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
})

router.delete('/:id',async(req,res)=>{
    let db = req.db;
    let id = req.params.id;
    let tokenId = req.body.tokenId;
    try{
        let decodedToken = await getAuth().verifyIdToken(tokenId);
        if(!decodedToken.uid) {
            res.status(403).send("Forbidden user");
        }
        let coll = await db.collection('Wishlist');
        await coll.updateOne({'uid':decodedToken.uid},{$pull:{wishlist:{id:id}}})
      
        res.status(200).send("Deleted")
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router