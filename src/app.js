
const express = require("express"); 
const mongoose = require("mongoose");
const env = require('dotenv');

env.config();
const app = express();
app.use(express.json());




  const connectDB = async () => {
    console.log( process.env.MONGODB_URI

    )
    try {
        
        console.log("Database connection established...");
        
        const PORT = process.env.PORT || 7777;
        app.listen(PORT, () => {
            console.log(`Server is successfully listening on port ${PORT}...`);
        });
    } catch (err) {
        console.error("Database cannot be connected!!", err);
    }
};


  connectDB();
  app.get("/user", (req, res) => {
    res.send({ firstName: "shubham", lastName: "annpurne" });
  });

  

