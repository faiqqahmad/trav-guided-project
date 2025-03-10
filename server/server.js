const express = require("express");
const cors = require('cors')
require("dotenv").config();

const { MongoClient } = require("mongodb");

const app = express();

app.use(cors())

const url = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB;

app.get("/api/:collection", async (req, res) => {
  try {
    const collectionName = req.params.collection;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const planets = await collection.find({}).toArray();
    res.json(planets);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something smells... No socks for you! ☹");
  }
});


app.get("/api/:collection/:id", async (req, res) => {
  try {
    const collectionName = req.params.collection;
    const _id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const planets = await collection.find({id:_id}).toArray();
    res.json(planets);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something smells... No socks for you! ☹");
  }
});


app.get("/api/films/:id/:collectionName", async (req, res) => {
  try {
    const collectionName = req.params.collectionName;
    const fullCollectionName = "films_"+collectionName;
    const _id = parseInt(req.params.id);
    let project;
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(fullCollectionName);
    if(collectionName === "planets"){
        project = {_id: 0, planet_id: 1}
    }
    else if(collectionName === "characters"){
        project = {_id: 0, character_id:1}
    }
    const planets = await collection.find({ film_id: _id }).project(project).toArray();
    res.json(planets);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something smells... No socks for you! ☹");
  }
});


app.get("/api/characters/:id/films", async (req, res) => {
  try {
    const collectionName = "films_characters"
    const _id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    let project = {_id:0, film_id:1}
    const collection = db.collection(collectionName);
    const planets = await collection.find({ character_id: _id }).project(project).toArray();
    res.json(planets);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something smells... No socks for you! ☹");
  }
});

app.get("/api/planets/:id/films", async (req, res) => {
  try {
    const collectionName = req.params.collectionName;
    const fullCollectionName = "films_planets";
    const _id = parseInt(req.params.id);
    let project = { _id: 0, film_id: 1 };
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(fullCollectionName);
    const planets = await collection.find({ planet_id: _id }).project(project).toArray();
    res.json(planets);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something smells... No socks for you! ☹");
  }
});

app.get("/api/planets/:id/characters", async (req, res) => {
  try {
    const collectionName = "characters";
    // const fullCollectionName = "films_planets";
    const _id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const planets = await collection.find({ homeworld: _id }).toArray();
    res.json(planets);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Hmmm, something smells... No socks for you! ☹");
  }
});

app.listen(4000, () => {
  console.log("Server started on Port 4000");
});
