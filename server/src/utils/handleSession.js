
const pool = require('../config');
const jwt = require("jsonwebtoken");
const { handleHttpError } = require("./handleErrors");

// *************** VERIFICAR EL TOKEN PARA EL LOGIN ***************
const authUser = async (req, res, next) => {
    try {
        const token = req.headers['auth-token'];
        jwt.verify(token, process.env.JWT_SECRET, (err,user) => {
            if(err){
                res.status(403).json({msg: 'NO AUTORIZADO'});
            } else {
                console.log('AUTORIZADO');
                next();
            }
        });

        // const token = req.header('auth-token');
        // if(!token) return res.status(401).json({ error: 'Acceso denegado no existe token'});

        // try {
        //     const verified = jwt.verify(token, process.env.JWT_SECRET);
        //     req.user = verified;
        //     console.log(`REQ.USER: ${req.user[0]}`);
        //     next();
            
        // } catch (error) {
        //     handleHttpError(res, "NOT_ALLOW", 409);
        //     console.log('NO SE PUDO VERIFICAR TOKEN');
        // }

        /*
        if (!req.headers.authorization) {
            console.log('NOT AUTH');
            handleHttpError(res, "NOT_ALLOW", 409);
            return;
        }
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
        console.log(tokenData);
        if (tokenData.id) {

            const user = await pool.query(`SELECT * FROM users WHERE id = ${tokenData.id}`, );
            req.user = user;
            console.log(user);

            return next();

        } else {
            handleHttpError(res, "NOT_ALLOW", 409);
            console.log('PRUEBA DE ERROR');
        }
        */
    } catch (e) {
        handleHttpError(res, 'NO SE PUDO VERIFICAR TOKEN', e);
    }
};
  
  module.exports = authUser;