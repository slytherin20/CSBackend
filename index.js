const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT
app.listen(port||5000,()=>{
    console.log("Server listening on port "+port+"...")
})