
import { Routes, Route } from "react-router-dom";
import { Login, Dashboard, Aplicaciones, Administracion, BaseDatos, Servidores } from '../pages';

function Rutas() {
    return (
        <Routes>
        
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/aplicaciones" element={<Aplicaciones />} />
          <Route path="/administracion" element={<Administracion />} />
          <Route path="/basedatos" element={<BaseDatos />} />
          <Route path="/servidores" element={<Servidores />} />

          <Route path='/' element={<Dashboard />} />

      </Routes>
    );
}

export default Rutas;