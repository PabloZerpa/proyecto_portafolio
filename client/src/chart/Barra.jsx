
import { useEffect, useState } from 'react';
import { CartesianGrid, XAxis, YAxis, Tooltip, Bar, BarChart, Legend } from 'recharts';

function Barra({datos, categoria, claves}) {

    const datosTemporales = [];
    const [datosGrafico, setDatosGrafico] = useState([]);

    const generar = (region,cantidad) => {
        return {
            name: region,
            cantidad: cantidad,
            amt: 440
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
            <h3 className='font-bold'>N° de Aplicaciones por region</h3>
            <BarChart width={730} height={250} data={datosGrafico ? datosGrafico : null}>
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
