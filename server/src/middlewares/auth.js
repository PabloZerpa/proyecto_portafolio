
const { verificarToken } = require('../middlewares/token');
const { handleHttpError } = require('./handleErrors');

const auth = async (req, res, next) => {

    const {authorization} = req.headers;
    if(!authorization) return res.status(401);

    const token = await verificarToken(authorization);
    console.log(token);
    if(token)
        next();
    else return 
        res.send('NO AUTORIZADO');
        
  };

const authSession = async (req,res,next) => {
    if (req.cookies.jwt) {
        try {
            const token = await verificarToken(req.cookies.jwt);
            if(token)
                next();
            else return 
                res.send('NO AUTORIZADO');
        } catch (error) {
            res.send('ERROR AL VERIFICAR TOKEN');
        }
    }else{
        res.send('ERROR AL OBTENER REQ COOKIES');    
    }
}

  module.exports = { auth, authSession };