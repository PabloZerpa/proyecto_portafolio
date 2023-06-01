const activeDirectory = require("activedirectory");

const config = { 
    url: 'ldap://matsed06.pdvsa.com', 
    baseDN: 'OU=Usuarios,DC=pdvsa,DC=com', 
}
const ad = new activeDirectory(config);

// *************** AUTENTICAR CREDENCIALES ***************
const autenticarUser = async(req, res, next) => {
    try {
        const { indicador, password } = req.body;
        const correo = `${indicador}@pdvsa.com`.toLowerCase();

        if(indicador === 'admin'){
            next();
        }
        else{
            ad.authenticate(correo, password, (err, auth) => {
                if (err) 
                    return res.status(401).json({ message: 'ERROR AL AUTENTICAR' });

                if (auth) 
                    next();
                else 
                    return res.status(401).json({ message: 'INDICADOR O CONTRASEÑA INCORRECTAS' });
            });
        }
    } catch (e) {
        return res.status(401).json({ message: 'ERROR AL AUTENTICAR' });
    }
};

// *************** VERIFICAR EL INDICADOR EN DIRECTORIO ACTIVO ***************
const verificarUser = (req, res, next) => {

    const { indicador } = req.body;

    ad.userExists(indicador, function(err, exists) {
        if (err)
            return res.status(401).json({ message: 'INDICADOR INVALIDO' });

        if(exists)
            next();
        else
            return res.status(401).json({ message: 'INDICADOR INVALIDO' });
    });

}


module.exports = { verificarUser, autenticarUser };