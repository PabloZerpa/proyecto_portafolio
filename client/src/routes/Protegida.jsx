
import { Navigate, Outlet } from "react-router-dom";
import Autorizacion from '../services/auth.service';

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