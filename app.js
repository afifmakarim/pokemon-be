var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var pokemonRouter = require("./routes/pokemon");

var mongoose = require("mongoose");

var mongoDB =
  "mongodb://admin:Indonesia92@belajar-mongo-shard-00-00.8vwyw.mongodb.net:27017,belajar-mongo-shard-00-01.8vwyw.mongodb.net:27017,belajar-mongo-shard-00-02.8vwyw.mongodb.net:27017/db_pokemon?ssl=true&replicaSet=belajar-mongo-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/v1/pokemon", pokemonRouter);

module.exports = app;
