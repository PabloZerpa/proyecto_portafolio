
const jwt = require("jsonwebtoken");

const generarToken = async (indicador,rol) => {
    return token = jwt.sign({indicador,rol}, 'SECRETO#123', {expiresIn: '1800s'}); 
};

const verificarToken = (authorization) => {

    const decoded = jwt.verify(authorization, 'SECRETO#123');
    const token = decoded;

    return token;
};


const renovarToken = (indicador,rol) => {
    return token = jwt.sign({indicador,rol}, 'SECRETO#123', {expiresIn: '20s'}); 
}


// *************** VERIFICAR EL TOKEN PARA EL LOGIN ***************
// const verifyToken = async (authorization) => {
//     try{
//         console.log('DENTRO DE VERIFICAR TOKEN');
//         console.log('AUTORIZACION: ' + authorization)

//         const tokenData = jwt.verify(authorization, 'SECRETO#123');

//         console.log(tokenData);
//         console.log('ARRIBA ESTA EL TOKEN DATA');

//         // const query = await pool.query('SELECT id, indicador, rol FROM usuarios WHERE indicador = ?', [tokenData.indicador]);
//         // const user = query[0][0];
//         // return user;

//         // ============ VERIFICA QUE SI EL TOKEN ESTA EXPIRADO ============ 
//         // if(jwt.TokenExpiredError){
//         //     console.log('TOKEN EXPIRADO')
//         //     res.send({message:"TokenExpired"})
//         //     // REGRESAR ALGO QUE PUEDA VERIFICAR EL CLIENT PARA HACER AUTORIZACION.LOGOUT();
//         // }

//         // ============ REFRESCA EL TOKEN CADA VEZ QUE SE HACE UNA PETICION ============ 
//         // const refreshToken = jwt.sign({
//         //     username: userCredentials.username,
//         // }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
     

//         return tokenData;

//     }
//     catch(e){
//         return;
//     }
// };

module.exports = { generarToken, verificarToken, renovarToken };