const express = require("express");
const path = require("path");
const { verify } = require("../middleware/auth");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, "..", "/views/index.html")));
});

router.get("/loginregister", (req, res) => {
  res.sendFile(
    path.resolve(path.join(__dirname, "..", "/views/loginregister.html"))
  );
});

router.get("/login", (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, "..", "/views/login.html")));
});

router.get("/dashboard", verify, (req, res) => {
  res.sendFile(
    path.resolve(path.join(__dirname, "..", "/views/dashboard.html"))
  );
});

router.get("/client", (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, "..", "/views/client.html")));
});

router.get("/profile", (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, "..", "/views/profile.html")));
});

module.exports = router;
