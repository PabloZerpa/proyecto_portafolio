
/*

const activeDirectory = require("activedirectory");
const { handleHttpError } = require("./handleErrors");

const config = { url : 'ldap://matsed06.pdvsa.com', baseDN : 'OU=Usuarios,DC=pdvsa,DC=com' }
const ad = new activeDirectory(config);

// *************** VERIFICAR EL TOKEN PARA EL LOGIN ***************
const authUser = async (req, res, next) => {
    try {
        const { indicador, password } = req.body;
        const correo = `${indicador}@pdvsa.com`.toLowerCase();
    
        ad.authenticate(correo, password, (err, auth) => {
            if(auth) next();
            if(err) return handleHttpError(res, 401, 'Datos incorrectos')
        })

    } catch (e) {
        handleHttpError(res, 'NO SE PUDO AUNTETICAR', e);
    }
};

const verificarUser = (req, res, next) => {

    const indicador = req.body.indicador.toLowerCase();

    ad.userExists(indicador, (err, exist) => {
        if(!exist) return manejarResp(res, 403, `El indicador ${indicador}, no se encuentra registrado en la intranet de PDVSA`);
        next();
    });
}


  
  module.exports = { authUser, verificarUser };

  */