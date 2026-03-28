const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const repository = require("./auth.repository");

exports.register = async ({ name, email, password }) => {
  const existingUser = await repository.findByEmail(email);

  if (existingUser) {
    throw new Error("El usuario ya existe");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await repository.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

exports.login = async ({ email, password }) => {
  const user = await repository.findByEmail(email);

  if (!user) {
    throw new Error("Credenciales inválidas");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Credenciales inválidas");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return {
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
    },
    token,
  };
};
