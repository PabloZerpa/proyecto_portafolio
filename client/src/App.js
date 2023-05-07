
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Header, Navegacion } from "./container";
import Rutas from "./routes/Rutas";

export default function App() {
  return (
    <HashRouter>
      
      <Header />
      <div className="flex">
        <Navegacion />
        <Rutas />
      </div>
      
    </HashRouter>
  );
}

