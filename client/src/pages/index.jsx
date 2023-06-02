import Login from './Login';
import Dashboard from './Dashboard';
import ActualizarApp from './Aplicaciones/ActualizarApp';
import Registrar from './Administracion/Registrar';
import RegistrarApp from './Aplicaciones/RegistrarApp';
import Permisos from './Administracion/Permisos';
import CrearUsuario from './Administracion/CrearUsuario';
import BuscarUsuario from './Administracion/BuscarUsuario';
import Aplicaciones from './Aplicaciones/Aplicaciones';
import VerAplicacion from './Aplicaciones/VerAplicacion';
import Diagramas from './Aplicaciones/Diagramas';
import Fallas from './Aplicaciones/Fallas/Fallas';
import RegistrarFalla from './Aplicaciones/Fallas/RegistrarFalla';
import BaseDatos from './BaseDatos/BaseDatos';
import VerBD from './BaseDatos/VerBD';
import RegistrarBD from './BaseDatos/RegistrarBD';
import ActualizarBD from './BaseDatos/ActualizarBD';
import Servidores from './Servidores/Servidores';
import RegistrarServidor from './Servidores/RegistrarServidor';
import VerServidor from './Servidores/VerServidor';
import ActualizarServidor from './Servidores/ActualizarServidor';
import Custodios from './Custodios/Custodios';
import RegistrarCustodio from './Custodios/RegistrarCustodio';
import ActualizarCustodio from './Custodios/ActualizarCustodio';
import VerCustodio from './Custodios/VerCustodio';

export {
    Login, 
    Dashboard,
    ActualizarApp,
    Registrar,
    RegistrarApp,
    Permisos,
    CrearUsuario,
    BuscarUsuario,
    Aplicaciones,
    VerAplicacion,
    Diagramas,
    Fallas,
    BaseDatos,
    VerBD,
    RegistrarBD,
    RegistrarFalla,
    ActualizarBD,
    Servidores,
    RegistrarServidor,
    VerServidor,
    ActualizarServidor,
    RegistrarCustodio,
    Custodios,
    ActualizarCustodio,
    VerCustodio,
};

/*

.custom(value => {
            const caracteres = value.split("");
            let puntosConsecutivos = false;

            caracteres.filter((caracter, index) => {
                if(index === 0 && !parseInt(caracter)){
                    console.log('VERSION INVALIDA');
                    return res.status(401).json({ message: 'VERSION INVALIDA' });
                }
                if(parseInt(caracter) || caracter === '0'){
                    puntosConsecutivos = false;
                    console.log('ES EL NUMERO: ' + caracter);
                }
                else if(caracter === '.'){
                    console.log('ES UN PUNTO: ' + caracter);

                    if(puntosConsecutivos){
                        console.log('VERSION INVALIDA');
                        return res.status(401).json({ message: 'VERSION INVALIDA' });
                    }
                    puntosConsecutivos = true;
                }
                else{ 
                    console.log('VERSION INVALIDA');
                    throw new Error('VERSION INVALIDA');
                }
            });
        }),


*/
