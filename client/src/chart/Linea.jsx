
import { CartesianGrid, XAxis, YAxis, Tooltip, Line, LineChart, Legend } from 'recharts';

const data = [
  {
    "name": "Enero",
    "uv": 4000,
    "Modificaciones": 10,
    "amt": 2400
  },
  {
    "name": "Febrero",
    "uv": 3000,
    "Modificaciones": 5,
    "amt": 2210
  },
  {
    "name": "Marzo",
    "uv": 2000,
    "Modificaciones": 23,
    "amt": 2290
  },
  {
    "name": "Abril",
    "uv": 2780,
    "Modificaciones": 11,
    "amt": 2000
  },
  {
    "name": "Mayo",
    "uv": 1890,
    "Modificaciones": 3,
    "amt": 2181
  },
  {
    "name": "Junio",
    "uv": 2390,
    "Modificaciones": 8,
    "amt": 2500
  },
  {
    "name": "Julio",
    "uv": 3490,
    "Modificaciones": 28,
    "amt": 2100
  },
  {
    "name": "Agosto",
    "uv": 2000,
    "Modificaciones": 2,
    "amt": 2290
  },
  {
    "name": "Septiembre",
    "uv": 2780,
    "Modificaciones": 15,
    "amt": 2000
  },
  {
    "name": "Octubre",
    "uv": 1890,
    "Modificaciones": 6,
    "amt": 2181
  },
  {
    "name": "Noviembre",
    "uv": 2390,
    "Modificaciones": 15,
    "amt": 2500
  },
  {
    "name": "Diciembre",
    "uv": 3490,
    "Modificaciones": 26,
    "amt": 2100
  }
]

function Linea() {

    return(
        <div className="w-4/3 flex flex-col justify-around items-center p-6 bg-zinc-200 rounded shadow-md">
            <h3 className='font-bold'>Historial de Modificaciones</h3>
            <LineChart width={540} height={220} data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend iconType="square" /> 
                <Line type="monotone" dataKey="Modificaciones" stroke="#8884d8" />
                {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
            </LineChart>
        </div>
    );
}

export default Linea;