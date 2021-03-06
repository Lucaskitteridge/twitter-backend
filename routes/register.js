const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.post("/", (req, res) => {

    let username = req.body['username'];
    let password = req.body['password'];

    if (username === '' || password === '') {
      res.send('username or password cannot be blank');
      return;
    }

    db.query(`SELECT * 
    FROM users 
    WHERE username = $1;`, [username])
      .then(response => {
        if (!response.rows.length) {
          return db.query(`
      INSERT INTO users (username, password)
      VALUES($1, $2)
      RETURNING *;
    `, [username, password])
            .then(response => {
              let userName = response.rows[0].username;
              req.session["userName"] = userName;
              res.send(`${userName} created successfully!`);
              return response.rows[0] ? response.rows[0] : null;
            })
            .catch(e => {
              res
                .status(500)
                .json({ error: e.message });
            });
        }
        res.send("user already exists in database");
      });
  });

  return router;
};