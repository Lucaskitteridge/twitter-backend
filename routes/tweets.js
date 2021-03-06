const { response } = require('express');
const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM tweets;`)
      .then(data => {
        const tweets = data.rows;
        res.json({ tweets });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {

    let content = req.body['content'];
    let userId = req.session["userId"];

    return db.query(`
      INSERT INTO tweets (content, user_id)
      VALUES($1, $2)
      RETURNING *;
    `, [content, userId])
      .then(response => {
        console.log('tweet added');
      });

  });

  router.put("/", (req, res) => {

    let content = req.body['content'];
    let userId = req.session["userId"];

    return db.query(`
      UPDATE tweets (content, user_id)
      SET content = $1
      WHERE id = $2
      RETURNING *;
    `, [content, userId])
      .then(response => {
        console.log('tweet updated');
        res
      });

  });

  router.delete("/", (req, res) => {

    let tweetId = req.session["userId"];

    return db.query(`
      DELETE tweets (tweet_id)
      WHERE id = $1
      RETURNING *;
    `, [tweetId])
      .then(response => {
        console.log('tweet deleted');
      });

  });

  return router;
};