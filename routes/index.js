import express from "express";
const router = express.Router();

//Get home page
router.get("/", (req, res) => {
  res.send("This is note routerlication of home page.");
});

//Not Found
router.get("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

module.exports = router;