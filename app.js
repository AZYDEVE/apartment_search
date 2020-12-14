const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const passportRouter = require("./routes/auth.js");
const configurePassport = require("./auth/authConfig");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

configurePassport(app);

app.use("/auth", passportRouter);
app.use("/users", usersRouter);
app.use("/", indexRouter);

module.exports = app;
