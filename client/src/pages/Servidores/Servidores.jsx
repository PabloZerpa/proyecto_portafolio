
import { useEffect, useState } from "react";
import { Container, Select, Radio, Tabla } from "../../components";
import { useDebounce } from 'use-debounce';
import { FaEdit, FaEye, FaSearch } from 'react-icons/fa';
import Autorizacion from "../../services/auth.service";
import Servidor from "../../services/servidor.service";
import { opcionEstatus, opcionRegion, opcionPlataforma, opcionAlcance, 
    opcionMantenimiento, opcionCount, opcionLocalidad, opcionTipoBD, opcionManejadores } from '../../services/campos.service';
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { selectTipoAmbiente } from "../../services/campos.service";
import { paginacionOpciones } from "../../utils/TablaOpciones";

const columns = [
    {
        name: 'Operaciones',
        button: true,
        cell: row => 
        <div className="flex gap-8">
            <Link to={row ? `/basedatos/${row.servidor_id}` : `/dashboard`} >
                <FaEye className="text-blue-500 text-lg" />
            </Link>
            
            {Autorizacion.obtenerUsuario.rol !== 'user' ? 
                <Link to={row ? `/administracion/actualizacion/${row.servidor_id}` : `/dashboard`} >
                <FaEdit className="text-blue-500 text-lg" />
                </Link>
            : 
                null
            }
        </div>,
    },
    {
        name: 'ID',
        selector: row => row.servidor_id,
        sortable: true,
        left: true,
        width: '60px'
    },
    {
        name: 'Nombre',
        selector: row => row.servidor,
        sortable: true,
        left: true
    },
    {
        name: 'Estatus',
        selector: row => row.ser_estatus,
        sortable: true,
        left: true
    },
    {
        name: 'Direccion',
        selector: row => row.ser_direccion,
        sortable: true,
        left: true
    },
    {
        name: 'OS',
        selector: row => row.sistema,
        sortable: true,
        left: true
    },
    {
      name: 'Modelo',
      selector: row => row.modelo,
      sortable: true,
      left: true
    },
    {
      name: 'Marca',
      selector: row => row.marca,
      sortable: true,
      left: true
    },
    {
        name: 'Region',
        selector: row => row.region,
        sortable: true,
        left: true
      },
      {
        name: 'Localidad',
        selector: row => row.localidad,
        sortable: true,
        left: true
      },
    {
        name: 'Ultima Actualizacion',
        selector: row => row.ser_fecha_actualizacion,
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

function Servidores() {

    const [searchTerm, setSearchTerm] = useState(" ");
    const [resultado, setResultado] = useState('');
    const [debounceValue] = useDebounce(searchTerm, 500);

    const [avanzados, setAvanzados] = useState(false);
    const [datos, setDatos] = useState({
        estatus: '',
        region: '',
        sistema: '',
        marca: '', 
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
            const { estatus,region,sistema,marca,orden } = datos;
            console.log(estatus,region,sistema,marca,orden);
            const respuesta = await Servidor.obtenerServidorPorBusqueda(
                value,estatus,region,sistema,marca,orden);
            setResultado(respuesta.data);
            console.log(respuesta.data);
            
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
                            <Select campo='Region' name='region' busqueda={true} byId={false} opciones={opcionRegion} manejador={handleInputChange} />
                            <Select campo='Sistema' name='sistema' busqueda={true} byId={false} opciones={['SELECCIONE','TODAS','WINDOWS','RED HAT','DEBIAN','FEDORA','ARCH',]} manejador={handleInputChange} />
                            <Select campo='Marca' name='marca' busqueda={true} byId={false} opciones={['SELECCIONE','TODAS','HP','VIT','LENOVO','ACER','ASUS']} manejador={handleInputChange} />
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

        </Container>
        
    )
};

export default Servidores;