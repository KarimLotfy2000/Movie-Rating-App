const express = require("express");
const router = express.Router();
const connection = require("../config/db");

//Search for a certain film

router.get("/", (req, res) => {
  //ex : localhost:7000/search/?q=dark
  const searchTerm = req.query.q;

  const query = `
    SELECT * FROM movies 
    WHERE name LIKE '%${searchTerm}%' OR actors LIKE '%${searchTerm}%'
     `;

  connection.query(query, (error, results) => {
    if (error) return res.status(400).json(error);
    res.json(results);
  });
});
module.exports = router;
