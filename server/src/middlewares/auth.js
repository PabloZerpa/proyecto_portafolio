
const { verificarToken } = require('../helpers/token');

const auth = async (req, res, next) => {

    const {authorization} = req.headers;
    if(!authorization) return res.status(401);

    const token = await verificarToken(authorization);
    console.log(token);
    if(token)
        next();
    else 
        return res.send('NO AUTORIZADO');
        
};

module.exports = { auth };