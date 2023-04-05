const bcrypt = require("bcryptjs");

const encriptar = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  };
  
  
const comparar = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword);
};
  
module.exports = { encriptar, comparar };