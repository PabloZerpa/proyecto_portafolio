import { useState, useEffect } from "react";
import { Tabla, Container } from "../../components";
import { BiLoaderAlt } from "react-icons/bi";
import Usuarios from "../../services/user.service";
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

function Diagramas() {

    const [datos, setDatos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        async function fetchData(){
        try {
            const allData = await Usuarios.obtenerDatosUsuarios();
            setIsLoading(false);
            setDatos(allData.data);
        }
        catch (error) {
            console.log(error)
        }
        }
        fetchData();
    }, []);

    return (
        <Container>

            {isLoading ? (
                <BiLoaderAlt className='text-6xl text-blue-500 animate-spin' />
            ) : (
            <>
              <div className="w-2/3 flex flex-col justify-around items-center p-6 bg-zinc-200 rounded shadow-md">
                <h3 className='font-bold'>N° de Aplicaciones por region</h3>
                <BarChart width={730} height={250} data={dataRegion}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="cantidad" fill="#459ad3" />
                </BarChart>
              </div>

              <div className="w-2/3 flex flex-col justify-around items-center p-6 bg-zinc-200 rounded shadow-md">
                <h3 className='font-bold'>Porcentaje de aplicaciones por prioridad</h3>
                <PieChart width={300} height={300}>
                <Pie
                  data={dataPrioridad}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={120}
                  dataKey="value" >
                    {dataPrioridad.map((entry, index) => (
                    <Cell className="opacity-70 cursor-pointer hover:opacity-100" key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Legend />
                </PieChart>
              </div>
            </>
                )
            }
            
      </Container>
    )
};

export default Diagramas;