
import { BrowserRouter } from "react-router-dom";
import { Header, Navegacion } from "./container";
import Rutas from "./routes/Rutas";

export default function App() {
  return (
    <BrowserRouter>

      <Header />
      <Navegacion />
      <Rutas />
      
    </BrowserRouter>
  );
}

