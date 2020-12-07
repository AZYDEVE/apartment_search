const express = require("express");
const router = express.Router();
const db = require("../front-react/db/mongodb");
const passwordHash = require("password-hash");

/* GET users listing. */
router.post("/if_user_exist", async function (req, res, next) {
  console.log(req.body);
  const p = await db.getData("apartment", "users", req.body);
  console.log(p);
  if (p.length === 0) {
    res.json({ result: false });
    console.log(p);
  } else {
    res.json({ result: true });
  }
});

router.post("/insert_user", async function (req, res, next) {
  console.log(req.body);
  const userInfo = req.body;
  const password = passwordHash.generate(userInfo.password);
  console.log(password);
  userInfo.password = password;
  await db.insertData("apartment", "users", userInfo);
});

//write record the user to currentLogIn collected if user log in successfully
router.post("/get_token", async function (req, res) {
  console.log(req.body);
  const p = await db.insertData("apartment", "currentLogIn", req.body);
  res.json(p);
});

// check if the user email and password matches with the user database
// if yes, record the user email to the currentLogin and send back {result: true} , else send back {result : false}
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
