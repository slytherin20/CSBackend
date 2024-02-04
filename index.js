const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const dashboard = require('./routes/dashboard')
const paints = require('./routes/paints')
const paintingMedium = require('./routes/paintingMedium');
const canvas = require('./routes/canvas')
const brushes = require('./routes/brushes')
const pensmarkers = require('./routes/pensmarkers')
const dotenv = require('dotenv');
const cors = require("cors");
dotenv.config()
const uri = process.env.ENV=='Dev'?process.env.LOCAL_CONNECTION_STRING:null
const app = express();
const port = process.env.PORT
app.use(
    cors({
      origin:
        
          "http://localhost:5000"
    })
  );

const client = new MongoClient(uri);

async function connectToDB(){
    try{
        await client.connect();
        console.log("Connected to DB...");
        return true;
    }
    catch(err){
        console.error("Error facing while connecting to DB...");
        throw new Error(err)
    }
}
connectToDB().then(()=>{

app.use(bodyParser.json());
app.use((req,res,next)=>{
    req.db = client.db('app_data');
    next();
});
app.use('/dashboard',dashboard);
app.use('/Paints',paints);
app.use('/Painting-Medium',paintingMedium);
app.use('/Canvas',canvas);
app.use('/Brushes',brushes);
app.use('/Pens-and-Markers',pensmarkers)
}).catch(err=> {
    console.log(err)
    app.use((req,res,next)=>{
        res.status(500).send("Internal Server Error");
    }).finally(async()=>{
        await client.close();
        console.log('Connection to DB closed....')
    })
})

app.listen(port||5000,()=>{
    console.log("Server listening on port "+port+"...")
})