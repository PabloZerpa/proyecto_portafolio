
import { useEffect, useState } from 'react';
import { CartesianGrid, XAxis, YAxis, Tooltip, Line, LineChart, Legend } from 'recharts';


function Linea({datos, categoria, claves}) {

  const datosTemporales = [];
  const [datosGrafico, setDatosGrafico] = useState([]);

  const generar = (mes,cantidad) => {
    return {
        name: mes,
        Modificaciones: cantidad,
        uv: 1000,
        amt: 1000,
    }
  }

  useEffect(() => {
    for (let i = 1; i < claves.length; i++) {
        datosTemporales.push(generar(claves[i], datos[`${categoria}${i}`]));
    }
    setDatosGrafico(datosTemporales);

  }, []);
  
  
  return(
      <div className="w-4/3 flex flex-col justify-around items-center p-6 bg-zinc-200 rounded shadow-md">
          <h3 className='font-bold'>Historial de Modificaciones</h3>
          <LineChart width={540} height={220} data={datosGrafico}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend iconType="square" /> 
              <Line type="monotone" dataKey="Modificaciones" stroke="#8884d8" />
          </LineChart>
      </div>
  );
}

export default Linea;