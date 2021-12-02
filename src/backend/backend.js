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
