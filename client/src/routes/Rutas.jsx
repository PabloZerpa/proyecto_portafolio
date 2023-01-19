
import { Routes, Route } from "react-router-dom";
import { Protegida } from "./Protegida";
import { Login, Dashboard, Aplicaciones, Actualizacion, Administracion, BaseDatos, Servidores } from '../pages';

function Rutas() {
    return (
        <Routes>
        
          <Route element={<Protegida redirectTo='/dashboard' />}>
            <Route path="*" element={<Login />} />
          </Route>

          <Route element={<Protegida redirectTo='/' />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/aplicaciones" element={<Aplicaciones />} />
            <Route path="/aplicaciones/actualizacion/:id" element={<Actualizacion />} />
            <Route path="/administracion" element={<Administracion />} />
            <Route path="/basedatos" element={<BaseDatos />} />
            <Route path="/servidores" element={<Servidores />} />
            <Route path='*' element={<Dashboard />} />

          </Route> 

      </Routes>
    );
}

export default Rutas;