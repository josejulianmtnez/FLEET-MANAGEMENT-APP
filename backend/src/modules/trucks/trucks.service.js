const repository = require("./trucks.repository");

exports.getAll = async () => {
  return await repository.getAll();
};

exports.create = async (data) => {
  const { name, license_plate } = data;

  if (!name || !license_plate) {
    throw new Error("Nombre y placa son obligatorios");
  }

  const exists = await repository.findByPlate(license_plate);

  if (exists) {
    throw new Error("La placa ya existe");
  }

  return await repository.create(data);
};

exports.update = async (id, data) => {
  const exists = await repository.findById(id);

  if (!exists) {
    throw new Error("Camión no encontrado");
  }

  return await repository.update(id, data);
};

exports.remove = async (id) => {
  const exists = await repository.findById(id);

  if (!exists) {
    throw new Error("Camión no encontrado");
  }

  return await repository.softDelete(id);
};