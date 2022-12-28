
import { Navigate, Outlet } from "react-router-dom";
import AuthService from '../services/auth.service';

export const Protegida = ({children, redirectTo}) => {

    console.log('PASANDO POR RUTA PROTEGIDA');

    if(AuthService.getCurrentUser() == null)
        return <Navigate to={redirectTo} />

        
    return children ? children : <Outlet />;

}