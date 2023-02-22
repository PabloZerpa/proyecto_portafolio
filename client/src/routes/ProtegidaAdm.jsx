import { Navigate, Outlet } from "react-router-dom";
import Autorizacion from '../services/auth.service';

export const ProtegidaAdm = ({children}) => {

    if(Autorizacion.obtenerUsuario().rol !== 'admin')
        return <Navigate to='/' />

    return children ? children : <Outlet />;

}