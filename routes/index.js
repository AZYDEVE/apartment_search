const express = require("express");
const router = express.Router();
const db = require("../front-react/db/mongodb");

/* get all the apartment post */
router.post("/get_all_posts", async function (req, res) {
  const data = await db.getData("apartment", "postings", req.body);
  res.json(data);
});

module.exports = router;
