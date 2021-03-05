const express = require("express");
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const app = express();
const PORT = 8080; // default port 8080

const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'twitterclone'
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieSession({
  name: 'session',
  keys: ["Dont go chasing waterfalls"]
}));

const tweetDatabase = {
  "1": {
    "user_id": "1",
    "tweet": "Hello world"
  },
  "2": {
    "user_id": "1",
    "tweet": "Goodbye"
  }
};

const users = {
  "1": {
    id: "1",
    name: "LucasK",
    password: "hello"
  },
  "2": {
    id: "2",
    name: "jesseL",
    password: "thatsmean"
  }
};

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/tweets", (req, res) => {
  const templateVars = { tweets: tweetDatabase };
  res.send(templateVars);
});

app.post("/register", (req, res) => {
  const newId = generateRandomString();
  if (req.body["name"] === '' || req.body["password"] === '') {
    res.status(404);
    res.send("name or password field is blank");
  }
  //checking if email already exists
  for (let ids in users) {
    if (users[ids].name === req.body["name"]) {
      res.status(404);
      res.send("Account already exists for that name");
    }
  }
  const name = req.body["name"];
  const password = req.body["password"];
  const newIdObject = {newId, name, password};
  users[newId] = newIdObject;
  req.session.userId = users[newId];
  res.send(newIdObject);
});

app.post("/login", (req, res) => {
  const name = req.body["name"];
  const password = req.body["password"];
  const user = getUserByName(name, users);
  if (!user) {
    res.status(403);
    res.send("name does not exist");
    return;
  }
  if (password !== users[user].password) {
    res.status(403);
    res.send("passwords do not match");
    return;
  }
  req.session.user_id = users[user];
  res.send('We got in');
});

app.post("/logout", (req, res) => {
  res.clearCookie("username");
});

const getUserByName = (name, database) => {
  const keys = Object.keys(database);
  for (let key of keys) {
    const user = database[key];
    if (user.name === name) {
      return key;
    }
  }
};

const generateRandomString = () => {
  let r = Math.random().toString(36).substring(7);
  return (r);
};

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});