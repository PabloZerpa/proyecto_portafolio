
import { CartesianGrid, XAxis, YAxis, Tooltip, Bar, BarChart, Legend } from 'recharts';

const dataRegion = [
  {name: 'Centro', cantidad: 123, amt: 440},
  {name: 'Andes', cantidad: 45, amt: 440},
  {name: 'Oriente', cantidad: 72, amt: 440},
  {name: 'Carabobo', cantidad: 36, amt: 440},
  {name: 'Faja', cantidad: 52, amt: 440},
];

function Barra() {

    return(
        <div className="w-4/3 flex flex-col justify-around items-center p-6 bg-zinc-200 rounded shadow-md">
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
    );
}

export default Barra;
