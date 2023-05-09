
const { verificarToken, generarToken } = require('../helpers/token');
const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;

const auth = async (req, res, next) => {

    const {authorization} = req.headers;
    if(!authorization) return res.status(401);

    try {
        const token = await verificarToken(authorization);

        if(token)
            next();
        else 
            return res.status(401).send('NO AUTORIZADO');
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            console.log("Unauthorized! Access Token was expired!"); 
            return res.status(401).send('TOKEN EXPIRADO');
        }
    } 
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