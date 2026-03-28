const db = require("../../database/db");

exports.getAll = async () => {
  const result = await db.query(
    "SELECT * FROM payment_sources WHERE is_active = true ORDER BY created_at DESC"
  );
  return result.rows;
};

exports.findById = async (id) => {
  const result = await db.query(
    "SELECT * FROM payment_sources WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

exports.findByName = async (name) => {
  const result = await db.query(
    "SELECT * FROM payment_sources WHERE name = $1",
    [name]
  );
  return result.rows[0];
};

exports.create = async (data) => {
  const { name, description } = data;

  const result = await db.query(
    `
    INSERT INTO payment_sources (name, description)
    VALUES ($1, $2)
    RETURNING *
    `,
    [name, description]
  );

  return result.rows[0];
};

exports.update = async (id, data) => {
  const { name, description } = data;

  const result = await db.query(
    `
    UPDATE payment_sources
    SET name = $1,
        description = $2
    WHERE id = $3
    RETURNING *
    `,
    [name, description, id]
  );

  return result.rows[0];
};

exports.softDelete = async (id) => {
  await db.query(
    `
    UPDATE payment_sources
    SET is_active = false
    WHERE id = $1
    `,
    [id]
  );
};
