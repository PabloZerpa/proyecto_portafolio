
import { useEffect, useState } from "react";
import { Container, Select, Radio, Tabla } from "../../components";
import { useDebounce } from 'use-debounce';
import { FaEdit, FaEye, FaSearch } from 'react-icons/fa';
import Autorizacion from "../../services/auth.service";
import Base from "../../services/basedatos.service";
import { opcionEstatus, opcionRegion, opcionPlataforma, opcionAlcance, 
    opcionMantenimiento, opcionCount, opcionLocalidad, opcionTipoBD, opcionManejadores } from '../../services/campos.service';
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { selectTipoAmbiente } from "../../services/campos.service";


// const columnasUserSimple = ['Ver','ID','Nombre','Estatus','Tipo','Manejador','Version',
// 'N° Usuarios','Ambiente'];
    
// const columnasAdminSimple = ['Ver','Editar','ID','Nombre','Estatus','Tipo','Manejador','Version',
// 'N° Usuarios','Ambiente'];

const opciones = true;

const columns = [
    {
        name: 'Acciones',
        button: true,
        cell: row => 
        <div className="flex gap-8">
            <Link to={row ? `/basedatos/${row.base_datos_id}` : `/dashboard`} >
                <FaEye className="text-blue-500 text-lg" />
            </Link>
            
            {Autorizacion.obtenerUsuario.rol !== 'user' ? 
                <Link to={row ? `/administracion/actualizacion/${row.aplicacion_id}` : `/dashboard`} >
                <FaEdit className="text-blue-500 text-lg" />
                </Link>
            : 
                null
            }
        </div>,
    },
    {
        name: 'ID',
        selector: row => row.base_datos_id,
        sortable: true,
        left: true,
        width: '60px'
    },
    {
        name: 'Nombre',
        selector: row => row.base_datos,
        sortable: true,
        left: true
    },
    {
        name: 'Estatus',
        selector: row => row.estatus,
        sortable: true,
        left: true
    },
    {
        name: 'Tipo',
        selector: row => row.tipo,
        sortable: true,
        left: true
    },
    {
        name: 'Manejador',
        selector: row => row.manejador,
        sortable: true,
        left: true
    },
    {
      name: 'N° de Usuarios',
      selector: row => row.bas_cantidad_usuarios,
      sortable: true,
      left: true
    },
    {
      name: 'Ambiente',
      selector: row => row.tipo_ambiente,
      sortable: true,
      left: true
    },
    {
        name: 'Ultima Actualizacion',
        selector: row => row.bas_fecha_actualizacion,
        sortable: true,
        grow: 2,
        left: true
    },
    {
      name: 'Por',
      selector: row => row.indicador,
      sortable: true,
      grow: 1,
      left: true
  },
];
  
  const paginacionOpciones = {
    rowsPerPageText: 'Filas por Pagina',
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
  }

function BaseDatos() {

    const [searchTerm, setSearchTerm] = useState("a");
    const [resultado, setResultado] = useState('');
    const [debounceValue] = useDebounce(searchTerm, 500);

    const [avanzados, setAvanzados] = useState(false);
    const [datos, setDatos] = useState({
        estatus: '',
        tipo: '',
        manejador: '',
        ambiente: '', 
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
        setAvanzados(false);
        onSearch(debounceValue)
    }

    const handleInputChange = (e) => {
        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })
            
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
            const { estatus,tipo,manejador,ambiente,registros,orden } = datos;
            console.log(estatus,tipo,manejador,ambiente,registros,orden);
            const respuesta = await Base.obtenerBDPorBusqueda(
                value,estatus,tipo,manejador,ambiente,registros,orden);
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
                        <div className="grid grid-cols-4 gap-4">
                            <Select campo='Estatus' name='estatus' busqueda={true} byId={false} opciones={opcionEstatus} manejador={handleInputChange} />
                            <Select campo='Tipo' name='tipo' busqueda={true} byId={false} opciones={opcionTipoBD} manejador={handleInputChange} />
                            <Select campo='Manejador' name='manejador' busqueda={true} byId={false} opciones={opcionManejadores} manejador={handleInputChange} />
                            <Select campo='Ambiente' name='ambiente' busqueda={true} byId={false} opciones={selectTipoAmbiente} manejador={handleInputChange} />
                        </div>
                    </div>

                    <div className="radioArea">
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

                            <input type='reset' value='Restablecer' 
                                onClick={resetCampos}
                                className='w-20 h-8 text-xs bg-blue-600 text-white border-none outline-none rounded cursor-pointer hover:bg-blue-500' size='small' 
                            />

                        </div>
                    </div>
                </div>
            
            </form>

            {resultado ? (
                <div className="w-[1080px]">
                <DataTable
                    columns={columns}
                    data={resultado}
                    pagination
                    paginationComponentOptions={paginacionOpciones}
                    paginationRowsPerPageOptions={[10,20,30,50,100]}
                    noDataComponent={"SIN RESULTADOS"}
                    fixedHeader
                    fixedHeaderScrollHeight="600px"
                    highlightOnHover
                    pointerOnHover
                    dense
                />
                </div>
            ) : (null)}

            {/* {resultado ? (
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
            )} */}

        </Container>
        
    )
};

export default BaseDatos;