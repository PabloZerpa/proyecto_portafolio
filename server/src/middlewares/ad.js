const activeDirectory = require("activedirectory");

const config = { 
    url: 'ldap://matsed06.pdvsa.com', 
    baseDN: 'OU=Usuarios,DC=pdvsa,DC=com', 
}
const ad = new activeDirectory(config);

// *************** VERIFICAR EL TOKEN PARA EL LOGIN ***************
const autenticarUser = async(req, res, next) => {
    try {
        const { indicador, password } = req.body;
        const correo = `${indicador}@pdvsa.com`.toLowerCase();

        ad.authenticate(correo, password, (err, auth) => {
            if (err) {
                console.log('ERROR: ' + JSON.stringify(err));
                return;
            }

            if (auth) {
                console.log('Authenticated!');
                next();
            } else {
                console.log('Authentication failed!');
            }
        });

    } catch (e) {
        console.log('NO SE PUDO AUNTETICAR');
    }
};

const verificarUser = (req, res, next) => {

    const { indicador } = req.body;

    ad.userExists(indicador, function(err, exists) {
        if (err) {
            console.log('ERROR: ' + JSON.stringify(err));
            return;
        }

        console.log(indicador + ' exists: ' + exists);
        next();
    });
}

const buscarUser = (req, res, next) => {

    const { indicador } = req.body;

    ad.findUser(indicador, true, function(err, users) {
        if (err) {
            console.log('ERROR: ' + JSON.stringify(err));
            return;
        }

        if (!user) console.log('User: ' + indicador + ' not found.');
        else console.log(JSON.stringify(user));
    });
}



module.exports = { autenticarUser, verificarUser, buscarUser };