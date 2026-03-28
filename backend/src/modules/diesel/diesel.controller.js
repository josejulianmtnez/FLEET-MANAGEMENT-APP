const service = require("./diesel.service");

exports.getAll = async (req, res) => {
  try {
    const data = await service.getAllTransactions();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const transaction = await service.createTransaction(req.body);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const data = await service.getBalance();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
