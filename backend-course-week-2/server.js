require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT;


// Middleware
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
    console.log(`${req.method} ${req.url} - ${new Date()}`)
    next();
});

//Routes
app.get("/", (req, res) => {
    res.send("My Week 2 API")
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
    res.send(`User = ${id}`);
});




app.listen(PORT, ()=> {
    console.log(`Running on http://localhost:${ PORT }`);
});