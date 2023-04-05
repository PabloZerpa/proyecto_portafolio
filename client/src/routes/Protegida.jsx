
import { Navigate, Outlet } from "react-router-dom";
import Autorizacion from '../services/auth.service';

// ===================== RUTA PROTEGIDA PARA EL LOGIN =====================
export const Protegida = ({children, redirectTo}) => {

    if(redirectTo === '/dashboard'){
        if(Autorizacion.obtenerUsuario() !== null){
            return <Navigate to={redirectTo} />
        }
    }
    else if(Autorizacion.obtenerUsuario() === null)
        return <Navigate to={redirectTo} />

        
    return children ? children : <Outlet />;
}

// ===================== RUTA PROTEGIDA PARA ADMINISTRADORES =====================
export const ProtegidaAdm = ({children}) => {

    if(Autorizacion.obtenerUsuario().rol !== 'admin')
        return <Navigate to='/' />

    return children ? children : <Outlet />;
}


// ===================== RUTA PROTEGIDA PARA SUPERUSUARIO =====================
export const ProtegidaSuper = ({children}) => {

    if(Autorizacion.obtenerUsuario().rol !== 'superuser' && Autorizacion.obtenerUsuario().rol !== 'admin')
        return <Navigate to='/' />

    return children ? children : <Outlet />;
}