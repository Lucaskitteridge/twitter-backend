const express = require('express');
const router  = express.Router();

module.exports = (db) => {

  router.post("/", (req, res) => {
    let username = req.body['username'];
    let password = req.body['password'];
    return db.query(`
      SELECT * FROM users
      WHERE username = $1 AND password = $2;
    `, [username, password])
      .then(response => {
        if (response.rows[0]) {
          console.log("we found a user match!");
          let rightname = response.rows[0];
          req.session.userId = rightname['id'];
          res.json(rightname['id']);
          return res.redirect('/');
        } else {
          console.log("dont exist!");
          res.send("WRONG COMBO");
        }
      })
      .catch(e => {
        res.send(e);
      });
  });

  return router;
};
