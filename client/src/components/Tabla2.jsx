
import { useState,useEffect } from "react";
import { FaEdit, FaCheckCircle } from "react-icons/fa";
import { opcionEstatus, opcionPrioridad, opcionAlcance, 
    opcionPlataforma, opcionRegion, opcionSiNo } from '../services/campos.service';
import Autorizacion from '../services/auth.service';
import Aplicacion from '../services/aplicacion.service';
import { Notificacion } from '../utils/Notificacion';
import Paginacion from "./Paginacion";
  
function Tabla2({columnas, datos, paginacion=false, campo, devolverPagina=null}) {

    // VARIABLES PARA LA PAGINA
    const [pagina, setPagina] = useState(1);
    const [primerResultado, setPrimer] = useState([pagina-1]*20);
    const [ultimoResultado, setUltimo] = useState([pagina*20] - 1);
    const obtenerPagina = (respuesta) => {setPagina(respuesta); console.log('PAGINA EN TABLA 2: ' + pagina)};

    // VARIABLES LAS OPCIONES DE LENGUAJE-FRAMEWORK
    const [opcionLenguaje, setLenguajes] = useState([]);
    const [opcionFramework, setFramework] = useState([]);

    // VARIABLES EL VALOR-EDICION DEL UPDATE
    const [valor, setValor] = useState('');
    const [edicion, setEdicion] = useState(null);
    const habilitar = (id) => {setEdicion(id)}

    // FUNCION PARA CAMBIAR DE RANGO DE RESULTADOS
    const cambioPagina = () => {
        setPrimer([pagina-1]*20);
        setUltimo([pagina*20] - 1);
        if(devolverPagina)
            devolverPagina(pagina);
    }

    // -------------------- FUNCION PARA CAMBIAR DE PAGINA --------------------
    useEffect(() => {
        cambioPagina();
    }, [pagina, datos]);

    // -------------------- FUNCION OBTENER LOS VALORES DE LENGUAJE-FRAMEWORK --------------------
    useEffect(() => {
        async function fetchData(){
            try {
                const datosLenguajes = await Aplicacion.obtenerOpciones('lenguajes');
                const datosFrameworks = await Aplicacion.obtenerOpciones('frameworks');

                let lenguajes = [];
                for (let i = 0; i < Object.keys(datosLenguajes.data).length; i++) {
                lenguajes.push(datosLenguajes.data[i].lenguaje);
                }

                let frameworks = [];
                for (let i = 0; i < Object.keys(datosFrameworks.data).length; i++) {
                    frameworks.push(datosFrameworks.data[i].framework);
                }

                setLenguajes(lenguajes);
                setFramework(frameworks);
            }
            catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, []);

    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function updateData(e) {
        e.preventDefault();
        try {
            
            if(Autorizacion.obtenerUsuario().rol === 'admin'){

                const datoModificacion = { edicion, campo, valor, pagina };
                await Aplicacion.actualizarDato(4, datoModificacion); 
                Notificacion('ACTUALIZACION EXITOSA', 'success');
                habilitar();
            }
        }
        catch (error) { 
            Notificacion(error.response.data.message, 'error');
        }
    }

    // SELECT PERSONALIZADO
    const selectCampo = (opciones,valor) => {
        return (
            <select 
                className={`w-full p-2 bg-gray-50 border border-solid border-blue-500 text-gray-900 text-xs text-center rounded-md`} 
                onChange={(e) => {setValor(e.target.value)}}
            >
                {opciones.map((opcion, index) => {
                    if(opcion === valor)
                        return <option key={index} value={opcion}>{opcion}</option>
                    else
                        return <option key={index} value={opcion}>{opcion}</option>
                })}
            </select>
        )
    }

    // FUNCION PARA VERIFICAR Y ELEGIR SELECT SEGUN LA OPCION SELECCIONADA
    const verificarCampo = (campo, valor) => {
        if(campo === 'Estatus'){
            return (selectCampo(opcionEstatus,valor));
        }
        else if(campo === 'Prioridad'){
            return (selectCampo(opcionPrioridad,valor));
        }
        else if(campo === 'Alcance'){
            return (selectCampo(opcionAlcance,valor));
        }
        else if(campo === 'Region'){
            return (selectCampo(opcionRegion,valor));
        }
        else if(campo === 'Plataforma'){
            return (selectCampo(opcionPlataforma,valor));
        }
        else if(campo === 'Lenguaje'){
            return (selectCampo(opcionLenguaje,valor));
        }
        else if(campo === 'Framework'){
            return (selectCampo(opcionFramework,valor));
        }
        else if(campo === 'Codigo_Fuente' || campo === 'Critico'){
            return (selectCampo(opcionSiNo,valor));
        }
        else{
            return (
                <input type='text' defaultValue={valor}
                onChange={(e) => {setValor(e.target.value)}}
                className="w-full p-2 bg-gray-50 border border-solid border-blue-500 text-gray-900 text-xs text-center rounded-md" />
            )
        }
    }

    return (
        <div className="relative mx-8 mb-4 rounded">

            <table className="table-auto border-separate w-full text-xs text-center text-gray-700 shadow-md ">
                <thead className="text-xs text-gray-700 font-bold bg-zinc-200 uppercase">
                    
                    <tr className="bg-zinc-200 border-b hover:bg-gray-600 hover:text-gray-100">
                        {columnas.map((dato,index) => { return  <td key={index} scope="col" className="px-2 py-2">{dato}</td> }) }
                    </tr> 
                    
                </thead>
                <tbody>

                    {datos.map((dato,index) => { 
                        const valor = Object.values(dato);
                        return (
                        <tr key={index} className="bg-white border-b hover:bg-gray-100">
                            <td className="px-1 py-1">{valor[0]}</td>
                            <td className="px-1 py-1">{valor[1]}</td>
                            <td className="px-1 py-1">{valor[2]}</td>
                            <td className="px-1 py-1"> 
                                {edicion!==dato.aplicacion_id ? (
                                    <input type='text' defaultValue={valor[3]} disabled
                                    className="w-full p-2 bg-gray-50 border-none text-gray-900 text-xs text-center rounded-md" />
                                ) : (
                                    verificarCampo(columnas[3],valor[3])
                                )}
                                </td>
                            <td className="px-2 py-2">

                                {edicion===dato.aplicacion_id ? 
                                    <FaCheckCircle 
                                        onClick={updateData}
                                        className="ml-3 text-green-500 text-lg cursor-pointer"/>
                                    :
                                    <FaEdit 
                                        onClick={(e) => habilitar(dato.aplicacion_id)}
                                        className="ml-3 text-blue-500 text-lg cursor-pointer" />
                                }

                            </td>

                        </tr>
                    );
                })}
                </tbody>
            </table>

            {paginacion ? ( 
                <Paginacion
                    del={primerResultado+1} 
                    al={ultimoResultado+1} 
                    total={100}
                    devolver={obtenerPagina} />
            ) : (null)}
            
        </div>
    );
}

export default Tabla2;