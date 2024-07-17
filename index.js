var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))
mongoose.connect('mongodb://localhost:27017/Database')
var db = mongoose.connection
db.on('error', () => console.log("Error in Connection to database"))
db.once('open', () => console.log("Connected to the Database"))

app.post("/signup", (req, res) => {
    var name = req.body.name
    var email = req.body.email
    var password = req.body.password

    var data = {
        "name": name,
        "Email": email,
        "Password": password
    }
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successefully")
    })
    return res.redirect('home.html')
})

app.post("/login", async(req, res) => {
    try {
        var name = req.body.name;
        var password = req.body.password;

        var username = await Database.findone({ name: name });

        if (username.password === password) {
            res.status(201).render('home.html')
        } else {
            res.send("invalid login details");
        }
    } catch (error) {
        res.status(400).send("invalid login details")
    }
})


app.get("/", (req, res) => {
    res.set({
        "Allow-acces-Allow-Origin": '*'
    })
    return res.redirect('login.html')
}).listen(3000);

console.log("Listening on port 3000")