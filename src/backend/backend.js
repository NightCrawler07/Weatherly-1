/*

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/users", { useNewUrlParser: true });
const express = require("express");
const bodyParser = require("body-parser");

const user = new mongoose.Schema({
  uid: {
    type: String,
    unique: true,
    index: true,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
});

const table = mongoose.model("users", user);

// New app using express module
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/login.html");
});

app.post("/", function (req, res) {
  console.log(req.body);

  var uid = String(req.body.uid);
  var pass = String(req.body.pass);

  var user1 = [new table({ uid: uid, pass: pass })];
  table.insertMany(user1, (err, user) => {
    if (err) console.log(err);
    else console.log(user);
  });
  res.send("<h1>data stored</h1>");
});

app.listen(3000, function () {
  console.log("server is running on port 3000");
});

*/

const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");

const db = "mongodb+srv://kuxi:kuxi@cluster0.5iuws.mongodb.net/weatherly?retryWrites=true&w=majority";

mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("[INFO] MongoDB connection successful");
    })
    .catch((err) => {
        console.log("[ERROR] MongoDB connection failed");
        console.log(err);
    });

const user = new mongoose.Schema({
    uid: {
        type: String,
        unique: true,
        index: true,
        required: true,
    },
    pass: {
        type: String,
        required: true,
    },
    place: [
        {
            type: String,
        },
    ],
});

const table = mongoose.model("users", user);

// New app using express module
const app = express();
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.get("/", function (_req, res) {
    res.sendFile(__dirname + "/login.html");
});

app.post("/", function (req, res) {
    console.log(req.body);

    var uid = String(req.body.uid);
    var pass = String(req.body.pass);

    table.insertMany([new table({ uid: uid, pass: pass })], (err, user) => {
        if (err) {
            console.log("[ERROR]");
            console.log(err);
        } else {
            console.log("[INFO] New user added");
            console.log(user);
        }
    });
    res.send("<h1>data stored</h1>");
});

app.listen(3000, function () {
    console.log("[INFO] Server running on port 3000");
});

app.get("/api/locationTemperature", (_req, res) => {
    const api = {
        key: "cd3c097765ba92903ec783b6cf5bef86",
        base: "https://api.openweathermap.org/data/2.5/",
    };

    return fetch(`${api.base}weather?q=${_req.body.query}&units=metric&APPID=${api.key}`).then((weather) => {
        return weather.json();
    });
});
