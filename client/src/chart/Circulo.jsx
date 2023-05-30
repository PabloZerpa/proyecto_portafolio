
import { useEffect, useState } from 'react';
import { Legend, PieChart, Pie, Cell} from 'recharts';


function Circulo({datos, categoria, claves}) {

  const datosTemporales = [];
  const [datosGrafico, setDatosGrafico] = useState([]);

  const generar = (nombre,valor) => {
    return {
        name: nombre,
        value: valor,
    }
  }

  useEffect(() => {
    for (let i = 1; i < claves.length; i++) {
      datosTemporales.push(generar(claves[i], datos[`${categoria}${i}`]));
    }
    setDatosGrafico(datosTemporales);
  }, []);
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#f03737', '#0051bb', '#03792a', '#f8d742', '#970505'];
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
  
  return(
      <div className="w-2/3 flex flex-col space-y-2 justify-around items-center p-6 bg-zinc-200 rounded shadow-md">
          <h3 className='font-bold'>Porcentaje de aplicaciones por prioridad</h3>
          <PieChart width={400} height={400}>
          <Pie
              data={datosGrafico ? datosGrafico : null}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              dataKey="value" >
              {datosGrafico.map((entry, index) => (
              <Cell className="opacity-70 cursor-pointer hover:opacity-100" key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
          </Pie>
          <Legend />
          </PieChart>
      </div>
  );

}

export default Circulo;
