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
        let coll = await db.collection('Orders');
        let doc = await coll.findOne({'uid':decodedToken.uid});
        if(doc){
            let order = doc.orders.find(obj=> obj.id==id)
           res.status(200).json(order);
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
        let coll = await db.collection('Orders');
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
        let coll = await db.collection('Orders');
        let doc = await coll.findOne({'uid':decodedToken.uid});
        if(doc)
        await coll.updateOne({'uid':decodedToken.uid},{$push:{'orders':item}})
        else if(item)
        await coll.insertOne({ 'uid':decodedToken.uid,
    'orders':[item]
    });
    else 
    await coll.insertOne({ 'uid':decodedToken.uid,
    'orders':[]
    });
    res.status(200).send('Item inserted')
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
})


module.exports = router