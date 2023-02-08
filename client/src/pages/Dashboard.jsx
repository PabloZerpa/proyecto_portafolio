
import { useState, useEffect } from "react";
import { Tabla } from "../components";
import { BiLoaderAlt } from "react-icons/bi";
import Usuarios from "../services/user.service";

import { CartesianGrid, XAxis, YAxis, Tooltip, Bar, BarChart, Legend, PieChart, Pie, Cell} from 'recharts';
  
  const dataRegion = [
    {name: 'Centro', cantidad: 123, amt: 440},
    {name: 'Andes', cantidad: 45, amt: 440},
    {name: 'Oriente', cantidad: 72, amt: 440},
    {name: 'Carabobo', cantidad: 36, amt: 440},
    {name: 'Faja', cantidad: 52, amt: 440},
  ];
  
  const dataPrioridad = [
    { name: 'Alta', value: 92 },
    { name: 'Media', value: 196 },
    { name: 'Baja', value: 125 },
    { name: 'Indeterminado', value: 15 },
  ];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
const x = cx + radius * Math.cos(-midAngle * RADIAN);
const y = cy + radius * Math.sin(-midAngle * RADIAN);

return (
  <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
    {`${(percent * 100).toFixed(0)}%`}
  </text>
);
};

function Dashboard() {

  const [datosModificacion, setDatosModificacion] = useState([]);
  const [datosCreacion, setDatosCreacion] = useState([]);
  const [datos, setDatos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState('');

  useEffect(() => {

    async function fetchData(){
      try {
        const porModificacion = await Usuarios.obtenerPorModificacion();
        const porCreacion = await Usuarios.obtenerPorCreacion();
        const allData = await Usuarios.obtenerDatosUsuarios();
        setIsLoading(false);

        setDatosModificacion(porModificacion.data);
        setDatosCreacion(porCreacion.data);
        setDatos(allData.data);
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex w-full bg-transparent m-0 p-0">
      <div className="w-full m-0 flex flex-col justify-start items-center gap-10 pt-44 pl-56" >

        {isLoading ? (
            <BiLoaderAlt className='text-6xl text-blue-500 animate-spin' />
        ) : (
          <>
            {/* <Tabla datos={datosCreacion} opciones={false} /> */}
            <h3 className='font-bold'>Modificaciones Recientes</h3>
            <Tabla datos={datos} opciones={false} />

            <h3 className='font-bold'>N° de Aplicaciones por region</h3>
            <BarChart width={730} height={250} data={dataRegion}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="cantidad" fill="#d19755" />
            </BarChart>

            <h3 className='font-bold'>Porcentaje de aplicaciones por prioridad</h3>
            <PieChart width={400} height={400}>
              <Pie
                data={dataPrioridad}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                dataKey="value"
              >
                {dataPrioridad.map((entry, index) => (
                  <Cell className="opacity-70 cursor-pointer hover:opacity-100" key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </>
        )
      }

      </div>
    </div>
  )
};

export default Dashboard;