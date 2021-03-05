-- Drop and recreate tables
DROP TABLE IF EXISTS tweets CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE tweets(
  id SERIAL PRIMARY KEY NOT NULL,
  content VARCHAR(255) NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO labber;
ALTER USER labber WITH Superuser;