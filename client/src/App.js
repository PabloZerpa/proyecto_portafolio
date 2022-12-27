
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import 'antd/dist/reset.css';

import AuthService from "./services/auth.service";


export default function App() {

  const [user, setUser] = useState('');

  useEffect(() => {
    setUser(AuthService.getCurrentUser());
  }, []);

  return (
    <>
      <Header user={user} />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function NotFound() {
  return <>Ha llegado a una página que no existe</>;
}
