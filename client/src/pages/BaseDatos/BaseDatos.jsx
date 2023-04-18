
import { useEffect, useState } from "react";
import { Container, Select, Radio, Tabla } from "../../components";
import { useDebounce } from 'use-debounce';
import { FaEdit, FaEye, FaSearch } from 'react-icons/fa';
import Usuarios from "../../services/user.service";
import Autorizacion from "../../services/auth.service";
import { opcionEstatus, opcionRegion, opcionPlataforma, opcionAlcance, 
    opcionMantenimiento, opcionCount, opcionLocalidad } from '../../services/campos.service';
import { Link } from "react-router-dom";

const columnasUserSimple = ['Ver','ID','Nombre','Estatus','Tipo','Manejador','Version',
'N° Usuarios','Ambiente'];
    
const columnasAdminSimple = ['Ver','Editar','ID','Nombre','Estatus','Tipo','Manejador','Version',
'N° Usuarios','Ambiente'];

const opciones = true;

function BaseDatos() {

    const [searchTerm, setSearchTerm] = useState("");
    const [resultado, setResultado] = useState('');
    const rol = Autorizacion.obtenerUsuario().rol;
    const [debounceValue] = useDebounce(searchTerm, 500);

    const [avanzados, setAvanzados] = useState(false);
    const [datos, setDatos] = useState({
        estatus: '',
        plataforma: '', 
        prioridad: '',
        region: '',
        alcance: '',
        mantenimiento: '',
        fecha: '',
        critico: '',
        codigo: '',
        registros: 10,
        orden: 'ASC',
    }); 

    const resetCampos = () => {
        for (let clave in datos){
            if(clave==='orden')
                datos[clave] = 'ASC';
            else if(clave==='registros')
                datos[clave] = 10;
            else
                datos[clave] = '';
        }
    }

    const handleInputChange = (e) => {
        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })
        
        console.log(datos);
    }

    useEffect(() => {
		if (debounceValue) {
            onSearch(debounceValue);
        } else {
            setResultado(null);
        }
	}, [debounceValue, datos]); 


    const onSearch = async (value) => {
        try {
            const { estatus,plataforma,prioridad,region,alcance,mantenimiento,
                basedatos,servidor,critico,codigo,licencia,registros,orden } = datos;

            console.log(estatus,plataforma,prioridad,region,alcance,mantenimiento,
                basedatos,servidor,critico,codigo,licencia,registros,orden);

            const respuesta = await Usuarios.obtenerBDPorBusqueda(
                value,registros,orden);

            setResultado(respuesta.data);
            
        } catch (error) {
            console.log('ERROR AL BUSCAR DATOS');
        }
    }


    return(
        <Container>

            <form className='flex justify-center items-center flex-col p-4 bg-zinc-400 border-solid rounded'>
                <div className='flex flex-col gap-4 w-full py-2 border-solid'>

                    <div className="border-solid">
                        <p className="text-sm font-500">Base de datos</p>
                        <div className="grid grid-cols-4 gap-0">
                            <Select campo='Estatus' name='estatus' busqueda={true} opciones={opcionEstatus} manejador={handleInputChange} />
                            <Select campo='Tipo' name='tipo' busqueda={true} opciones={opcionRegion} manejador={handleInputChange} />
                            <Select campo='Manejador' name='manejador' busqueda={true} opciones={opcionPlataforma} manejador={handleInputChange} />
                            <Select campo='Ambiente' name='ambiente' busqueda={true} opciones={opcionCount} manejador={handleInputChange} />
                        </div>
                    </div>

                    <div style={avanzados ? {display: 'block'} : {display: 'none'}}>
                        <p className="text-sm font-500">Servidor</p>
                        <div className="grid grid-cols-4 gap-0">
                            <Select campo='Region' name='region' busqueda={true} opciones={opcionRegion} manejador={handleInputChange} />
                            <Select campo='Localidad' name='localidad' busqueda={true} opciones={opcionLocalidad} manejador={handleInputChange} />
                            <Select campo='Marca' name='marca' busqueda={true} opciones={opcionMantenimiento} manejador={handleInputChange} />
                            <Select campo='Fecha' name='fecha' busqueda={true} opciones={['2023','2022','2021','2020','2019','2018']} />
                        </div>

                        <p className="text-sm font-500">Aplicacion</p>
                        <div className="grid grid-cols-4 gap-0">
                            <Select campo='Region' name='region' busqueda={true} opciones={opcionRegion} manejador={handleInputChange} />
                            <Select campo='Localidad' name='localidad' busqueda={true} opciones={opcionLocalidad} manejador={handleInputChange} />
                            <Select campo='Plataforma' name='plataforma' busqueda={true} opciones={opcionPlataforma} manejador={handleInputChange} />
                            <Select campo='Alcance' name='alcance' busqueda={true} opciones={opcionAlcance} manejador={handleInputChange} />
                        </div>
                    </div>
                    
                    <div className="radioArea">
                        <div className="flex flex-wrap justify-center items-center">
                            <Radio label='Orden' name='orden' opciones={['ASC', 'DESC']} manejador={handleInputChange} />
                            <Radio label='Prioridad' name='prioridad' opciones={['TODAS', 'ALTA', 'MEDIA', 'BAJA']} manejador={handleInputChange} />
                        </div>

                        <div className='mt-8 flex justify-center items-center gap-4'>

                            <div className="relative w-96">
                                <input 
                                    type="search" 
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="block p-2 pr-12 w-96 text-sm text-black bg-white rounded border-none outline-none" placeholder="Buscar" />
                                <button 
                                    type="submit" 
                                    onClick={(e) => {e.preventDefault(); onSearch(debounceValue)}}
                                    className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-600 rounded-r border border-blue-700 hover:bg-blue-700">
                                    <FaSearch />
                                </button>
                            </div>
                            
                            <div>
                                <input className='mx-2 rounded' type="checkbox" onChange={(e) => setAvanzados(e.target.checked)} /> 
                                <label className='text-sm' >Avanzados</label>
                            </div>

                            <input type='reset' value='Restablecer' 
                                onClick={resetCampos}
                                className='w-20 h-8 text-xs bg-blue-600 text-white border-none outline-none rounded cursor-pointer hover:bg-blue-500' size='small' 
                            />

                        </div>
                    </div>
                </div>
            
            </form>

            {resultado ? (
            <table className="table-auto border-separate w-4/3 text-xs text-center text-gray-700 shadow-md">
                <thead className="text-xs text-gray-700 font-bold bg-zinc-200 uppercase">
                    
                    <tr className="bg-zinc-200 border-b hover:bg-zinc-300">
                        {opciones ? (
                            columnasAdminSimple.map((dato,index) => { 
                                if(index===0)
                                    return  <td key={index} scope="col" className="px-1 py-1">{dato}</td> 
                                else
                                    return  <td key={index} scope="col" className="px-1 py-1">{dato}</td> 
                            })
                        ) : (
                            columnasAdminSimple.map((dato, index) => { return  <td key={index} scope="col" className="px-1 py-1">{dato}</td> })
                        )}    
                    </tr>
                    
                </thead>
                <tbody>
                    {resultado.map((dato, index) => { 
                        let valor = Object.values(dato);
                        if(opciones){
                            console.log(dato.base_datos_id);
                            valor.unshift(
                                <Link to={dato.base_datos_id ? `/basedatos/actualizacion/${dato.base_datos_id}` : `/dashboard`} className='text-lg' state={dato} >
                                    <FaEdit className="text-blue-500" />
                                </Link>
                            )
                        }
                        valor.unshift(
                            <Link to={dato.base_datos_id ? `/basedatos/${dato.base_datos_id}` : `/dashboard`} className='text-lg' state={dato} >
                                <FaEye className="text-blue-500" />
                            </Link>
                        )
                        return (
                            <tr key={index} className="bg-white border-b hover:bg-gray-100">
                                {valor.map((valor, index) => {
                                        return ( <td key={index} className="px-2 py-2">{valor}</td> );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            ) : (
                <div></div>
            )}

            {/* <Tabla
                columnas={rol === 'admin' ? columnasAdminSimple : columnasUserSimple}
                datos={resultado} 
                opciones={(Autorizacion.obtenerUsuario().rol==='admin') ? true : false} 
                paginacion={true}
            /> */}

        </Container>
        
    )
};

export default BaseDatos;