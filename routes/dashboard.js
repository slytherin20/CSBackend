const express = require('express');
const router = express.Router();


router.get('/BrandSearch',async (req,res)=>{
    let brand = req.query.brand;
    let db = req.db;
    try{
        let dashboard = db.collection('Dashboard');
        let brandsArr = await dashboard.findOne({type:'BrandSearch'});
        brandsArr = brandsArr.data.data;
        if(brand){
            brandsArr = brandsArr.filter(el=>el.brand==brand)
        }
        res.status(200).json(brandsArr);
    }
    catch(err){
        console.log(err)
        res.status(400).send("Bad Request");
    }
})

router.get('/Categories',async(req,res)=>{
    let db = req.db;
    try{
        let dashboard = db.collection('Dashboard');
        let categories = await dashboard.findOne({type:'Categories'});
        res.status(200).json(categories.data)
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
})
router.post('/BrandSearch',async (req,res)=>{
    let db = req.db;
    let brandObj = req.body;
    try{
        let dashboard = db.collection('Dashboard');
        await dashboard.updateOne({type:'BrandSearch'},{$push:{'data.data':brandObj}})
        res.status(200).send('Brand added')
    }
    catch(err){
        console.log(err)
        res.status(500).send('Internal Server Error');
    }
})

module.exports = router