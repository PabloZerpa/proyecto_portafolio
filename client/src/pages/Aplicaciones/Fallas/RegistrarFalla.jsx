
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Input, Select, TableRegistro, TextArea } from "../../../components";
import { Notificacion } from "../../../utils/Notificacion";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";
import { obtenerUsuario, rutaAplicacion } from "../../../utils/APIRoutes";
import authHeader from "../../../utils/header";

function RegistrarFalla() {

    // ---------- FUNCION PARA NAVEGAR A RUTA INDICADA ----------
    const navigate = useNavigate();
    function navegar(ruta) { navigate(ruta) }

    // ---------- ESTADOS ----------
    const [isOpen, setIsOpen] = useState(false);
    const [datos, setDatos] = useState({
        usuario_creador: obtenerUsuario().indicador,
    });

    // =================== FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS ===================
    const setValores = async (e) => {
        const valor = e.target.value.toUpperCase();
        setDatos({ ...datos, [e.target.name] : valor })
    }

    // =================== FUNCION PARA REGISTRAR DATOS ===================
	async function registrarFalla(e){
        e.preventDefault();
        
        try {
            if(obtenerUsuario().rol !== 'user'){
                await axios.post(`${rutaAplicacion}/fallas`, datos, { headers: authHeader() });
                Notificacion('REGISTRO EXITOSO', 'success');
                setTimeout(() => { navigate("/aplicaciones/fallas") }, "2000");
            }
        }
        catch (error) { 
            Notificacion('ERROR AL REGISTRAR', 'error');
        }
    }

    const obtenerAplicacion = (respuesta) => {
        setDatos({ ...datos, 'aplicacion' : respuesta });
    };

    const columns = [
        {
            name: 'ID',
            selector: row => row.aplicacion_id,
            sortable: true,
            left: true,
            width: '60px',
        },
        {
            name: 'Acronimo',
            selector: row => row.apl_acronimo,
            sortable: true,
            left: true,
            width: "100px",
        },
        {
            name: 'Nombre',
            selector: row => row.apl_nombre,
            sortable: true,
            left: true,
            width: '150px',
        },
        {
          name: 'Alcance',
          selector: row => row.alcance,
          sortable: true,
          width: "150px",
          left: true
        },
        {
            name: 'Estatus',
            selector: row => row.estatus,
            sortable: true,
            left: true,
            width: "150px",
        },
        {
            name: 'Prioridad',
            selector: row => row.prioridad,
            sortable: true,
            width: "100px",
            left: true
        },
        {
            name: 'Direccion',
            selector: row => 
            <a className="text-blue-400" href={`https://${row.apl_direccion}`} rel="noreferrer" target="_blank" >
                {row.apl_direccion}
            </a>,
            sortable: true,
            width: "200px",
            left: true
        },
        {
            name: 'Region',
            selector: row => row.region,
            sortable: true,
            width: "150px",
            left: true
        },
    ];

    return (
        <Container>

            {/* --------------- VENTANA MODAL PARA REGISTRAR CUSTODIOS --------------- */}
            {isOpen ? (
                <TableRegistro
                    setIsOpen={setIsOpen}
                    devolverSelecciones={obtenerAplicacion}
                    columnas={columns}
                    objetivo='aplicacion'
                    busqueda={true}
                    selectDefault={null}
                />
            ) : (null) }
            <form className="flex flex-col items-center space-y-8 pb-4" onSubmit={registrarFalla}>

                <div className="flex flex-col items-center space-y-2">
                    <h2 className='font-bold text-base'>Datos de la Falla</h2>

                    <div className="flex flex-col p-4 w-[320px] md:w-[640px] lg:w-[800px] bg-zinc-400 rounded">
                        <div className="flex items-center space-x-4">
                            <Input campo='Aplicacion' name='aplicacion' editable={false} propiedad={datos.aplicacion ? datos.aplicacion : 'SELECCIONE'} />
                            <button type='button' className="p-1 mt-2 w-20 h-8 bg-blue-600 text-white text-sm rounded" 
                                onClick={(e) => {setIsOpen(!isOpen)}} >
                                Seleccionar
                            </button>
                        </div>
                        
                        <Select campo='Impacto' name='impacto' required={true} byId={false} opciones={['SELECCIONE','ALTA','MEDIA','BAJA']} manejador={setValores}/>
                        <div className="col-span-2">
                            <TextArea campo='Descripcion' name='descripcion' area={true} required={true} editable={true} manejador={setValores} />
                            <TextArea campo='Solucion' name='solucion' area={true} editable={true} manejador={setValores} />
                        </div>
                    </div>
                </div>

                <div className="flex space-x-2 md:space-x-12">
                    <Button tipo='button' width={32} manejador={(e) => navegar(-1)} ><FaArrowLeft className="mr-2" />Volver</Button>
                    <Button tipo='submit' width={32}>Registrar</Button>
                </div>

            </form>
            
        </Container>
    )
};

export default RegistrarFalla;