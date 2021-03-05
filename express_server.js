const express = require("express");
const cookieSession = require('cookie-session');
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const router = express.Router();
const app = express();
const PORT = 8080; // default port 8080

const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

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
  res.send({ tweets: tweetDatabase });
});

// app.post("/login", (req, res) => {
//   const name = req.body["name"];
//   const password = req.body["password"];
//   const user = getUserByName(name, users);
//   if (!user) {
//     res.status(403);
//     res.send("name does not exist");
//     return;
//   }
//   if (password !== users[user].password) {
//     res.status(403);
//     res.send("passwords do not match");
//     return;
//   }
//   req.session.user_id = users[user];
//   res.send('We got in');
// });

// app.post("/logout", (req, res) => {
//   res.clearCookie("username");
// });

// const getUserByName = (name, database) => {
//   const keys = Object.keys(database);
//   for (let key of keys) {
//     const user = database[key];
//     if (user.name === name) {
//       return key;
//     }
//   }
// };

// const generateRandomString = () => {
//   let r = Math.random().toString(36).substring(7);
//   return (r);
// };

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});