const db = require("../../database/db");

exports.getAll = async () => {
  const result = await db.query(`
    SELECT *
    FROM diesel_transactions
    ORDER BY effective_date DESC
  `);

  return result.rows;
};

exports.create = async (data) => {
  const {
    effective_date,
    type,
    amount,
    truck_id,
    payment_source_id,
    reference,
    notes,
  } = data;

  const result = await db.query(
    `
    INSERT INTO diesel_transactions
    (effective_date, type, amount, truck_id, payment_source_id, reference, notes)
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *
    `,
    [
      effective_date,
      type,
      amount,
      truck_id || null,
      payment_source_id || null,
      reference,
      notes,
    ]
  );

  return result.rows[0];
};

exports.getBalance = async () => {
  const result = await db.query(`
    SELECT
      COALESCE(SUM(CASE WHEN type = 'CREDIT' THEN amount END), 0) AS total_credits,
      COALESCE(SUM(CASE WHEN type = 'DEBIT' THEN amount END), 0) AS total_debits,
      COUNT(*) AS transaction_count
    FROM diesel_transactions
  `);

  const data = result.rows[0];

  return {
    total_credits: Number(data.total_credits),
    total_debits: Number(data.total_debits),
    transaction_count: Number(data.transaction_count),
    balance: Number(data.total_credits) - Number(data.total_debits),
  };
};
