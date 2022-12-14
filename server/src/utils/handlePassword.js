
const bcryptjs = require("bcryptjs");

// ENCRIPTAMIENTO DE LA CONTRASEÑA
const encrypt = async (passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 10);
    return hash;
};

// COMPARA Y VERIFICA LA CONTRASEÑA
const compare = async (passwordPlain, hash) => {
    return await bcryptjs.compare(passwordPlain, hash);
};

module.exports = { encrypt, compare };