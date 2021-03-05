const express = require("express");
require('dotenv').config();
const cookieSession = require('cookie-session');
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

app.use("/register", registerRoutes(db));
app.use("/login", loginRoutes(db));
app.use("/logout", logoutRoutes(db));
app.use("/tweets", tweetsRoutes(db));

app.get("/", (req, res) => {
  res.send("Hello!");
});


// module.exports = (db) => {

//   router.post("/login", (req, res) => {

//     let name = req.body.username;
//     let password = req.body.password;

//     return db.query(`
//       INSERT INTO users (name, password)
//       VALUES($1, $2)
//       RETURNING *;
//     `, [name, password,])
//       .then(response => {
//         console.log(response);
//         res.send(response);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   });
//   return router;
// };

// app.post("/register", (req, res) => {

//   const newId = generateRandomString();
//   if (req.body["name"] === '' || req.body["password"] === '') {
//     res.status(404);
//     res.send("name or password field is blank");
//   }
//   //checking if email already exists
//   for (let ids in users) {
//     if (users[ids].name === req.body["name"]) {
//       res.status(404);
//       res.send("Account already exists for that name");
//     }
//   }
//   const name = req.body["name"];
//   const password = req.body["password"];
//   const newIdObject = {newId, name, password};
//   users[newId] = newIdObject;
//   req.session.userId = users[newId];
//   res.send(newIdObject);
// });

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