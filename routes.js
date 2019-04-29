"use strict";
const gaBot = require("./bot");

module.exports = app => {
  app.post("/gawebhook", function(req, res) {
    gaBot.execute(req, res);
  });
};
