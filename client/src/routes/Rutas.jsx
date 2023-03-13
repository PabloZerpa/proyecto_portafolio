
import { Routes, Route } from "react-router-dom";
import { Protegida } from "./Protegida";
import { ProtegidaAdm } from "./ProtegidaAdm";
import { 
  Login, 
  Dashboard,
  Administracion,
  Actualizacion,
  Registro,
  Solicitudes,
  Solicitud,
  CrearSolicitud,
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

            <Route element={<ProtegidaAdm />} >
              <Route path="/administracion" element={<Administracion />} />
              <Route path="/administracion/actualizacion/:id" element={<Actualizacion />} />
              <Route path="/administracion/registro" element={<Registro />} />
              <Route path="/administracion/solicitudes" element={<Solicitudes />} />
              <Route path="/administracion/solicitudes/:id" element={<Solicitud />} />
              <Route path="/administracion/crearsolicitud" element={<CrearSolicitud />} />
            </Route>
            
            <Route path="/aplicaciones/" element={<Aplicaciones />} />
            <Route path="/aplicaciones/:id" element={<Vista />} />
            <Route path="/aplicaciones/diagramas" element={<Diagramas />} />
              
            <Route path="/basedatos" element={<BaseDatos />} />
            
          </Route> 

      </Routes>
    );
}

export default Rutas;