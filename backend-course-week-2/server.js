require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT;


app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));



app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

app.post("/user", (req, res) => {
    const {name, email} = req.body;
    
    if (!name || !email){
        return res.status(400).json({error : "Name and Email is required"})
    }
    res.status(201).json({message: `Hello ${name}!`});
});

app.get("/user/:id", (req, res)=> {
    const {id} = req.params; 
    res.send(`User ${id} profile`);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

app.listen(PORT, ()=> {
    console.log(`Running on http://localhost:${ PORT }`);
});