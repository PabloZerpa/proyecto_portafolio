
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ---------- COMPONENTES ----------
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Header from "./components/Header";
import { Protegida } from "./components/Protegida";
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
        <Route exact path="/" element={
          <Protegida redirectTo='/dashboard'>
            <Login />
          </Protegida> 
        } />

        <Route exact path="/dashboard" element={
          <Protegida redirectTo='/'>
            <Dashboard />
          </Protegida> 
        } />

      </Routes>
      
    </BrowserRouter>
  );
}

