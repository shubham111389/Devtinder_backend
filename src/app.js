
const express = require("express"); 
const mongoose = require("mongoose");
const env = require('dotenv');

env.config();
const app = express();
app.use(express.json());


app.post("/user/:id", async (req, res) => {
    console.log(req.params);
    console.log( req.query) // Logs the route parameters
    res.send("Data successfully saved to the database!");
});

app.post("/user", async (req, res) => {
    console.log(req.body);
    console.log( req.params)
    console.log( req.query)
    // saving data to DB
    res.send("Data successfully saved to the database!");
  });

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

  

