const service = require("./auth.service");

exports.register = async (req, res) => {
  try {
    const user = await service.register(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const data = await service.login(req.body);
    res.json(data);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
