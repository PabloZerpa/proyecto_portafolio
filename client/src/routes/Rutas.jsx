
import { Routes, Route } from "react-router-dom";
import { Protegida } from "./Protegida";
import { Login, Dashboard, Aplicaciones, Actualizacion, Administracion, BaseDatos } from '../pages';
import Vista from "../pages/Apl_Vista";
import Agregar from "../pages/Adm_Agregar";

function Rutas() {
    return (
        <Routes> 
        
          <Route element={<Protegida redirectTo='/dashboard' />}>
            <Route path="*" element={<Login />} />
          </Route>

          <Route element={<Protegida redirectTo='/' />}>

            <Route path='*' element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />

            <Route path="/aplicaciones/" element={<Aplicaciones />} />
            <Route path="/aplicaciones/:id" element={<Vista />} />

            <Route path="/administracion" element={<Administracion />} />
            <Route path="/administracion/actualizacion/:id" element={<Actualizacion />} />
            <Route path="/administracion/agregar" element={<Agregar />} />
            
            <Route path="/basedatos" element={<BaseDatos />} />
            
          </Route> 

      </Routes>
    );
}

export default Rutas;