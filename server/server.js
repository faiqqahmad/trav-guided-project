const express = require("express");
require("dotenv").config();

const { MongoClient } = require("mongodb");

const app = express();

app.get("/api/planets", (req, res) => {
  res.send(process.env.MONGO_URI);
});

app.listen(4000, () => {
  console.log("Server started on Port 4000");
});
