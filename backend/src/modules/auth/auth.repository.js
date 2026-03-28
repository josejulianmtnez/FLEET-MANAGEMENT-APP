const db = require("../../database/db");

exports.findByEmail = async (email) => {
  const result = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
};

exports.create = async (user) => {
  const { name, email, password } = user;

  const result = await db.query(
    `
    INSERT INTO users (name, email, password)
    VALUES ($1, $2, $3)
    RETURNING id, name, email
    `,
    [name, email, password]
  );

  return result.rows[0];
};
