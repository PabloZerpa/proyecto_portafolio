
import { BrowserRouter } from "react-router-dom";

// ---------- COMPONENTES ----------
import { Header } from "./components/";
import Rutas from "./routes/Rutas";
import 'antd/dist/reset.css';

 
export default function App() {

  return (
    <BrowserRouter>

      <Header login={false} user={null} />

      <Rutas />
      
    </BrowserRouter>
  );
}

