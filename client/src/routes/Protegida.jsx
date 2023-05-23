
import { Navigate, Outlet } from "react-router-dom";
import { obtenerUsuario } from '../../src/utils/APIRoutes';

// ===================== RUTA PROTEGIDA PARA EL LOGIN =====================
export const Protegida = ({children, redirectTo}) => {

    if(redirectTo === '/dashboard'){
        if(obtenerUsuario() !== null){
            return <Navigate to={redirectTo} />
        }
    }
    else if(obtenerUsuario() === null)
        return <Navigate to={redirectTo} />

        
    return children ? children : <Outlet />;
}

// ===================== RUTA PROTEGIDA PARA ADMINISTRADORES =====================
export const ProtegidaAdm = ({children}) => {

    if(obtenerUsuario().rol !== 'admin')
        return <Navigate to='/' />

    return children ? children : <Outlet />;
}


// ===================== RUTA PROTEGIDA PARA SUPERUSUARIO =====================
export const ProtegidaSuper = ({children}) => {

    if( (obtenerUsuario().rol !== 'superuser') && (obtenerUsuario().rol !== 'admin') )
        return <Navigate to='/' />

    return children ? children : <Outlet />;
}