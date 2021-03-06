const { assert } = require('chai');
require('dotenv').config();
const { Pool } = require('pg');
const dbParams = require('../lib/db');
const db = new Pool(dbParams);
db.connect();

describe('Login user', function () {
  it('should return a user if user exists in db', function() {
    let username = 'JohnSmith';
    let password = "password";
    let expectedOutput = 1;
    let dbquery = db.query(`
      SELECT * FROM users
      WHERE username = $1 AND password = $2;
    `, [username, password]);
    assert.equal(dbquery, expectedOutput);
  });
});