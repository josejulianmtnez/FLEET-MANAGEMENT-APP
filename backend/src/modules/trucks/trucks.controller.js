const service = require("./trucks.service");

exports.getAll = async (req, res) => {
  try {
    const data = await service.getAll();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const truck = await service.create(req.body);
    res.status(201).json(truck);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const truck = await service.update(req.params.id, req.body);
    res.json(truck);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.remove = async (req, res) => {
  try {
    await service.remove(req.params.id);
    res.json({ message: "Camión desactivado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
