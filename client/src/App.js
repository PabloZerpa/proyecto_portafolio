
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import 'antd/dist/reset.css';

export default function App() {
  return (
    <>
      <Navbar />
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
