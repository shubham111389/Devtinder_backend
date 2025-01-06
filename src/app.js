
const express = require("express"); 

const app = express();

app.use("/",( req, res)=>{
    res.send("server starting...");
})

app.listen( '7000', ()=>{
    console.log("server listening on 7000 port");
})