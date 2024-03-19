const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes/upload");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

//setting up view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.static(path.join(__dirname, "public")));

app.use(router);

mongoose
  .connect(
    "mongodb+srv://rc:rc1511@cluster0.tnomarw.mongodb.net/FileUpload?retryWrites=true&w=majority"
  )
  .then((result) => {
    console.log("connected to db!");
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
