
import { Legend, PieChart, Pie, Cell} from 'recharts';

  
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

function Circulo() {

    return(
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
    );
}

export default Circulo;