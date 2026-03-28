const db = require("../../database/db");

exports.getAll = async () => {
  const result = await db.query(
    "SELECT * FROM trucks WHERE is_active = true ORDER BY created_at DESC"
  );
  return result.rows;
};

exports.findById = async (id) => {
  const result = await db.query(
    "SELECT * FROM trucks WHERE id = $1",
    [id]
  );
  return result.rows[0];
};

exports.findByPlate = async (plate) => {
  const result = await db.query(
    "SELECT * FROM trucks WHERE license_plate = $1",
    [plate]
  );
  return result.rows[0];
};

exports.create = async (data) => {
  const { name, license_plate, model, year } = data;

  const result = await db.query(
    `
    INSERT INTO trucks (name, license_plate, model, year)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `,
    [name, license_plate, model, year]
  );

  return result.rows[0];
};

exports.update = async (id, data) => {
  const { name, license_plate, model, year, current_km } = data;

  const result = await db.query(
    `
    UPDATE trucks
    SET name = $1,
        license_plate = $2,
        model = $3,
        year = $4,
        current_km = $5
    WHERE id = $6
    RETURNING *
    `,
    [name, license_plate, model, year, current_km, id]
  );

  return result.rows[0];
};

exports.softDelete = async (id) => {
  await db.query(
    `
    UPDATE trucks
    SET is_active = false
    WHERE id = $1
    `,
    [id]
  );
};
