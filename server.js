"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const http = require("http").Server(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("port", process.env.PORT || 3000);
require("./routes")(app);
http.listen(app.get("port"), function() {
  console.log("listening on port " + app.get("port"));
});
