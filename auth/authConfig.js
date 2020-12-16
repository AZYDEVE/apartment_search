var passport = require("passport");
const mongodb = require("../db/mongodb");
const passwordHash = require("password-hash");
const Strategy = require("passport-local").Strategy;

module.exports = function configurePassport(app) {
  console.log("configuring passport");

  function findByUsername(username) {
    return username === "John"
      ? { username: "John", password: "JohnKnows" }
      : null;
  }

  passport.use(
    new Strategy(async function (username, password, cb) {
      console.log("Authenticating", username, password);

      try {
        const user = await mongodb.getData("apartment", "users", {
          username: username,
        });

        const verification = passwordHash.verify(password, user[0].password);

        if (!user) {
          console.log("User not found");
          return cb(null, false);
        }
        if (verification === false) {
          console.log("Wrong password");
          return cb(null, false);
        }

        console.log("User athenticated");
        return cb(null, user[0]);
      } catch (err) {
        console.log("Error auth", err);
        return cb(err, null);
      }
    })
  );

  passport.serializeUser(function (user, cb) {
    cb(null, user.username);
  });

  passport.deserializeUser(async function (username, cb) {
    try {
      const user = await mongodb.getData("apartment", "users", {
        username: username,
      });
      cb(null, user[0]);
    } catch (err) {
      cb(err);
    }
  });

  app.use(require("body-parser").urlencoded({ extended: true }));
  app.use(
    require("express-session")({
      secret: "yeah I'm original",
      resave: false,
      saveUninitialized: false,
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
