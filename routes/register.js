const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {

    let name = req.body.name;
    let password = req.body.password;

    return db.query(`
      INSERT INTO users (name, password)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `, [name, password])
      .then(response => {
        res.send(response)
      })
      .catch(e => {
        response.send(e);
      });
  });

  return router;
};