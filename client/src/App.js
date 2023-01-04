
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";

// ---------- COMPONENTES ----------
import { Header, Navegacion } from "./components/";
import Rutas from "./routes/Rutas";
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
      <Navegacion />

      <Rutas />
      
    </BrowserRouter>
  );
}

