
const { verificarToken } = require('../helpers/token');

const auth = async (req, res, next) => {

    const {authorization} = req.headers;
    if(!authorization) return res.status(401);

    const token = await verificarToken(authorization);
    
    if(token)
        next();
    else 
        return res.status(401).send('NO AUTORIZADO');
        
};

module.exports = { auth };