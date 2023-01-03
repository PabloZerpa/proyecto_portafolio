
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ---------- COMPONENTES ----------
import { Protegida } from "./components/Protegida";
import { Login, Dashboard, Aplicaciones, Administracion, BaseDatos, Servidores } from './pages/';
import Header from "./components/Header";
import 'antd/dist/reset.css';

// ---------- SERVICIOS ----------
import AuthService from "./services/auth.service";

 
export default function App() {

  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(AuthService.obtenerUsuario());
  }, []);

  return (
    <BrowserRouter>

      <Header user={user} />

      <Routes>
        
        <Route element={<Protegida redirectTo='/dashboard' />}>
          <Route path="*" element={<Login />} />
        </Route>

        <Route element={<Protegida redirectTo='/' />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/aplicaciones" element={<Aplicaciones />} />
          <Route path="/administracion" element={<Administracion />} />
          <Route path="/basedatos" element={<BaseDatos />} />
          <Route path="/servidores" element={<Servidores />} />
          <Route path='*' element={<Dashboard />} />
        </Route> 

      </Routes>
      
    </BrowserRouter>
  );
}

