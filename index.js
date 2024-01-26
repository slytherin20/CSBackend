const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const dashboard = require('./routes/dashboard')
const dotenv = require('dotenv');
dotenv.config()
const uri = process.env.ENV=='Dev'?process.env.LOCAL_CONNECTION_STRING:null
const app = express();
const port = process.env.PORT

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


}).catch(err=> {
    console.log(err)
    app.use((req,res,next)=>{
        res.status(500).send("Internal Server Error");
    })
})

app.listen(port||5000,()=>{
    console.log("Server listening on port "+port+"...")
})