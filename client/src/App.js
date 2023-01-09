
import { BrowserRouter } from "react-router-dom";
// ---------- COMPONENTES ----------
import { Header, Navegacion } from "./components/";
import Rutas from "./routes/Rutas";
import 'antd/dist/reset.css';


 
export default function App() {

  return (
    <BrowserRouter>

      <Header />
      <Navegacion />
      <Rutas />
      
    </BrowserRouter>
  );
}

