const express = require("express");
require('dotenv').config();
const cookieSession = require('cookie-session');
const postman = require('postman');
const bodyParser = require("body-parser");
const app = express();
const PORT = 8080; // default port 8080

const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ['Hello there']
}));

const registerRoutes = require("./routes/register");
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const tweetsRoutes = require('./routes/tweets');
const usersRoutes = require('./routes/users');

app.use("/register", registerRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/logout", logoutRoutes(db));
app.use("/tweets", tweetsRoutes(db));
app.use("/users", usersRoutes(db));

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});