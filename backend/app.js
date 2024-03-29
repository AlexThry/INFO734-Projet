const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const router = express.Router();

const app = express();

const userRoutes = require("./routes/user");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const messageRoutes = require("./routes/message");

// BDD Connexion
const url =
  "mongodb://tplebani:info734@193.48.125.44/tplebani?authMechanism=DEFAULT&authSource=admin";

mongoose
  .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  );
  next();
});

// ROUTES STATIQUES
app.use("/images", express.static(path.join(__dirname, "images")));

// ROUTES
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/message", messageRoutes);

module.exports = app;
