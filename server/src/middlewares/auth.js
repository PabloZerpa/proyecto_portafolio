
const { verificarToken } = require('../helpers/token');

const auth = async (req, res, next) => {

    const {authorization} = req.headers;
    if(!authorization) return res.status(401);

    const token = await verificarToken(authorization);
    // console.log('Token Verificado');
    // console.log(token);
    
    if(token)
        next();
    else 
        return res.status(401).send('NO AUTORIZADO');
        
};

const authAdmin = async (req, res, next) => {

    const {authorization} = req.headers;
    if(!authorization) return res.status(401);

    const token = await verificarToken(authorization);
    if(token.rol === 'admin')
        next();
    else 
        return res.status(401).send('NO AUTORIZADO');
        
};

module.exports = { auth, authAdmin };