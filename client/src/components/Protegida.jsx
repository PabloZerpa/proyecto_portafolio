
import { Navigate, Outlet } from "react-router-dom";
import AuthService from '../services/auth.service';

export const Protegida = ({children, redirectTo}) => {

    if(redirectTo === '/dashboard'){
        if(AuthService.obtenerUsuario() !== null){
            return <Navigate to={redirectTo} />
        }
    }
    else if(AuthService.obtenerUsuario() === null)
        return <Navigate to={redirectTo} />

        
    return children ? children : <Outlet />;

}