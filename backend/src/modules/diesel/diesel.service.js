const repository = require("./diesel.repository");

exports.getAllTransactions = async () => {
  return await repository.getAll();
};

exports.createTransaction = async (data) => {
  const { type, truck_id, payment_source_id } = data;

  if (type === "DEBIT" && !truck_id) {
    throw new Error("DEBIT requiere truck_id");
  }

  if (type === "CREDIT" && !payment_source_id) {
    throw new Error("CREDIT requiere payment_source_id");
  }

  return await repository.create(data);
};

exports.getBalance = async () => {
  return await repository.getBalance();
};
