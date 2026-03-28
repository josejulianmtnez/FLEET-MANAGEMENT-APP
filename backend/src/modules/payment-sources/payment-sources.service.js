const repository = require("./payment-sources.repository");

exports.getAll = async () => {
  return await repository.getAll();
};

exports.create = async (data) => {
  const { name } = data;

  if (!name) {
    throw new Error("El nombre es obligatorio");
  }

  const exists = await repository.findByName(name);

  if (exists) {
    throw new Error("La fuente de pago ya existe");
  }

  return await repository.create(data);
};

exports.update = async (id, data) => {
  const exists = await repository.findById(id);

  if (!exists) {
    throw new Error("No existe la fuente de pago");
  }

  return await repository.update(id, data);
};

exports.remove = async (id) => {
  const exists = await repository.findById(id);

  if (!exists) {
    throw new Error("No existe la fuente de pago");
  }

  return await repository.softDelete(id);
};
