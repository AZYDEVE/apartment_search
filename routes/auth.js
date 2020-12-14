const express = require("express");
const passwordHash = require("password-hash");
const router = express.Router();
const passport = require("passport");
const mongodb = require("../db/mongodb");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ status: false });
    }
    req.login(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.json({ status: true });
    });
  })(req, res, next);
});

// router.post("/login", passport.authenticate("local"), function (req, res) {
//   console.log(req.user); // showing the user obj
//   if (req.user) {
//     res.json({ status: true });
//   } else {
//     res.json({ status: false });
//   }
// });

router.get("/getUser", (req, res) => {
  console.log("alex" + req.user.username); // not showing the user obj
  console.log("Alex:" + req.user._id);
  res.send({ username: req.user ? req.user.username : null });
});

router.get("/logout", function (req, res) {
  req.logOut();
  // res.redirect("/");
  res.send({});
});

router.post("/insert_user", async function (req, res, next) {
  console.log(req.body);
  const userInfo = req.body;
  const password = passwordHash.generate(userInfo.password);
  console.log(password);
  userInfo.password = password;
  await mongodb.insertData("apartment", "users", userInfo);
  req.login(userInfo, async function (err) {
    if (err) {
      console.log(err);
    }
    await mongodb.insertData("apartment", "liked", {
      username: req.body.username,
      liked: [],
    });

    res.json({ status: true });
  });
});

/* check if user exist */
router.post("/if_user_exist", async function (req, res, next) {
  console.log(req.body);
  const p = await mongodb.getData("apartment", "users", req.body);
  console.log(p);
  if (p.length === 0) {
    res.json({ result: false });
    console.log(p);
  } else {
    res.json({ result: true });
  }
});

router.get("/autherized", function (req, res) {
  console.log(req.user);
  if (req.user) {
    res.json({ status: true });
  } else {
    res.json({ status: false });
  }
});

module.exports = router;
