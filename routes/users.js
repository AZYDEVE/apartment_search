const express = require("express");
const router = express.Router();
const db = require("../db/mongodb");
const passwordHash = require("password-hash");

router.post("/get_token", async function (req, res) {
  console.log(req.body);
  const p = await db.insertData("apartment", "currentLogIn", req.body);
  res.json(p);
});

router.post("/check_email_and_password", async function (req, res) {
  const token = await db.getData("apartment", "currentLogIn", {
    email: req.body.email,
  });
  const p = await db.getData("apartment", "users", { email: req.body.email });

  console.log(p);
  console.log(token);
  const user = p[0];
  const verification = passwordHash.verify(req.body.password, user.password);

  if (p.length === 0) {
    res.json({ result: "not exist" });
  } else {
    if (verification) {
      if (token.length === 0) {
        await db.insertData("apartment", "currentLogIn", {
          email: req.body.email,
        });
      }
      res.json({ result: true });
    } else {
      res.json({ result: false });
    }
  }
});

module.exports = router;
