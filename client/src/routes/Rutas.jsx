
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
  CrearUsuario,
  BuscarUsuario,
  Aplicaciones,
  Vista,
  Diagramas,
  BaseDatos, 
  VistaDB,
  CrearBD,
  Fallas,
  RegistroFalla,
  ActualizarBD
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
              <Route path="/administracion/permisos/crear" element={<CrearUsuario />} />
              <Route path="/administracion/permisos/buscar" element={<BuscarUsuario />} />
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
            <Route path="/aplicaciones/fallas" element={<Fallas />} />
            <Route path="/aplicaciones/fallas/registro" element={<RegistroFalla />} />
              
            {/* MODULO DE ADMINISTRACION */}
            <Route path="/basedatos" element={<BaseDatos />} />
            <Route path="/basedatos/:id" element={<VistaDB />} />
            <Route path="/basedatos/registro" element={<CrearBD />} />
            <Route path="/basedatos/actualizacion/:id" element={<ActualizarBD />} />
            
          </Route> 

      </Routes>
    );
}

export default Rutas;