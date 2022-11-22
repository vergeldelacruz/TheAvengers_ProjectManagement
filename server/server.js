// Loads the configuration from config.env to process.env
require("dotenv").config({ path: "./config.env" });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
var path = require("path");

// Initiate Mongo Server
const InitiateMongoServer = require("./config/db");
InitiateMongoServer();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

// Router
app.use(require("./routes/user"));
app.use(require('./routes/project'));
app.use(require('./routes/task'));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});