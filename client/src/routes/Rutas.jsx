
import { Routes, Route } from "react-router-dom";
import { Protegida, ProtegidaAdm, ProtegidaSuper } from "./Protegida";
import { 
  Login, 
  Dashboard,
  Administracion,
  Actualizacion,
  Registro,
  Solicitudes,
  Solicitud,
  CrearSolicitud,
  Perfil,
  Permisos,
  Aplicaciones,
  Vista,
  Diagramas,
  BaseDatos, 
} from '../pages';

function Rutas() {
    return (
        <Routes> 
        
          <Route element={<Protegida redirectTo='/dashboard' />}>
            <Route path="*" element={<Login />} />
          </Route>

          <Route element={<Protegida redirectTo='/' />}>

            <Route path='*' element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/perfil" element={<Perfil />} />

            {/* MODULO DE ADMINISTRACION */}
            <Route element={<ProtegidaAdm />} >
              {/* REGISTRO Y PERMISOS SOLO PUEDE ACCERDER LOS ADMIN */}
              <Route path="/administracion/permisos" element={<Permisos />} />
              <Route path="/administracion/registro" element={<Registro />} />
            </Route>

            <Route element={<ProtegidaSuper />} >
              {/* ADMINISTRACION POR CAMPO Y ACTUALIZACION POR ID PUEDEN ACCERDER SUPERUSER Y ADMIN */}
              <Route path="/administracion" element={<Administracion />} />
              <Route path="/administracion/actualizacion/:id" element={<Actualizacion />} />
            </Route>
            
            {/* MODULO DE APLICACIONES */}
            <Route path="/aplicaciones/" element={<Aplicaciones />} />
            <Route path="/aplicaciones/:id" element={<Vista />} />
            <Route path="/aplicaciones/diagramas" element={<Diagramas />} />
              
            {/* MODULO DE ADMINISTRACION */}
            <Route path="/basedatos" element={<BaseDatos />} />

            {/* MODULO DE SOLICITUDES */}
            <Route path="/solicitudes" element={<Solicitudes />} />
            <Route path="/solicitudes/:id" element={<Solicitud />} />

            {/* CREACION DE SOLICITUDES PUEDEN ACCERDER SUPERUSER Y ADMIN */}
            <Route element={<ProtegidaSuper />} >
              <Route path="/solicitudes/crear" element={<CrearSolicitud />} />
            </Route>
            
          </Route> 

      </Routes>
    );
}

export default Rutas;