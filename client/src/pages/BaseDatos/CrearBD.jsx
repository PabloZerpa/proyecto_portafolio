
import { Navigate } from 'react-router-dom';
import { Container } from '../../components';
import Autorizacion from '../../services/auth.service';

function CrearBD() {

    if(Autorizacion.obtenerUsuario().rol !== 'admin')
        return <Navigate to='/' />
    
    return (
        <Container>

            

        </Container>
    )
};

export default CrearBD;