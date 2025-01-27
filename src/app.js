
const express = require("express"); 

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
app.get("/user", (req, res) => {
    res.send({ firstName: "shubham", lastName: "annpurne" });
  });

  

app.listen( '7000', ()=>{
    console.log("server listening on 7000 port");
    
})