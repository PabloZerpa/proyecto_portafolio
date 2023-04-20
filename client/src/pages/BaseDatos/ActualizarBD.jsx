
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, Checkbox, Container, Input, Select } from '../../components';
import { BiLoaderAlt } from "react-icons/bi";
import Autorizacion from '../../services/auth.service';
import Base from '../../services/basedatos.service';
import { useEffect, useState } from 'react';

function ActualizarBD() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [load, setLoad] = useState(true);
    const [valor, setValor] = useState('');

    const [registrarServidor, setRegistrarServidor] = useState(false);
    const habilitarServidor = () => {
        setRegistrarServidor(!registrarServidor)
        if(!registrarServidor){
            setDatos({ ...datos, select_servidor : null })
        }
    }

    const [datos, setDatos] = useState({
        base_datos: '',
        estatus: '',
        tipo: '',
        manejador: '',
        version_manejador: '',
        tipo_ambiente: '',
        cantidad_usuarios: '',
        select_aplicacion: '',
        select_servidor: '',
        creador: Autorizacion.obtenerUsuario().indicador,
    });

    const handleInputChange = (e) => {

        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })
    }

    useEffect(() => {
        async function fetchData(){
            try {
                const valores = await Base.obtenerBD(id);
                setValor(valores.data); 
                setLoad(true); 

            }catch (error) { console.log(error); }
        } 
        fetchData();  
    }, []);

    // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
    async function updateData(e) {
        e.preventDefault();

        try {
          console.log('TRY DEL CREATE');
          if(Autorizacion.obtenerUsuario().rol === 'admin'){
            
            await Autorizacion.actualizarDatosDB(id,datos);
          }
        }
        catch (error) { 
            console.log('ERROR AL ACTUALIZAR APL_ACT'); 
        }
      }

    if(Autorizacion.obtenerUsuario().rol !== 'admin')
        return <Navigate to='/' />
    
    if(!load)
        <BiLoaderAlt className='text-6xl text-blue-500 animate-spin' />
    else{
        return (
            <Container>
                <h1 className='font-bold text-lg'>Actualizacion de Base de datos</h1>
    
                <form className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-24 mb-10 rounded drop-shadow-md" onSubmit={updateData}>
                    
                    <h2 className='font-bold text-base mb-6'>Informacion General</h2>
    
                    <Input campo='Nombre' name='base_datos' propiedad={valor.base_datos} editable={true} area={true} manejador={handleInputChange} />
                    <div className="relative grid grid-cols-2 gap-4 mb-0">
                        <Select campo='Estatus' name='estatus' propiedad={valor.bas_estatus} opciones={['SELECCIONE','DESARROLLO','ESTABILIZACION','MANTENIMIENTO']} manejador={handleInputChange}/>
                        <Select campo='Tipo' name='tipo' propiedad={valor.tipo} opciones={['SELECCIONE','RELACIONAL','NO RELACIONAL','DISTRIBUIDA']} manejador={handleInputChange} />
                        <Select campo='Manejador' name='manejador' propiedad={valor.manejador} opciones={['SELECCIONE','MYSQL','POSTGRESS','ORACLE',]} manejador={handleInputChange} />
                        <Input campo='Version' name='version_manejador' propiedad={valor.version_manejador} editable={true} manejador={handleInputChange} />
                        <Select campo='Ambiente' name='tipo_ambiente' propiedad={valor.bas_tipo_ambiente} opciones={['SELECCIONE','DESARROLLO','ESTABILIZACION','MANTENIMIENTO']} manejador={handleInputChange} />
                        <Input campo='N° Usuario' name='cantidad_usuarios' propiedad={valor.bas_cantidad_usuarios} editable={true} manejador={handleInputChange} />
                    </div>
    
                    {/* --------------- APLICACION --------------- */}
                    <p className='font-bold text-base my-4'>Aplicacion</p>
                    <div className="grid grid-cols-2 gap-4">
                        <Select campo='Seleccione Aplicacion' name='select_aplicacion' opciones={['SELECCIONE',1,2,3,4,5,6,7,8,9,10]} manejador={handleInputChange}/>
                        <div className='mt-6'>
                            <Button width={32}><Link to={`/administracion/registro`} target="_blank">Registrar Nueva</Link></Button>
                        </div>
                    </div>
    
                    {/* --------------- SERVIDOR --------------- */}
                    <p className='font-bold text-base my-4'>Servidor</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div style={registrarServidor ? {display: 'none'} : {display: 'block'}}>
                            <Select campo='Seleccione Servidor' name='select_servidor' opciones={['SELECCIONE','SERVIDOR 1','SERVIDOR 2','SERVIDOR 3']} manejador={handleInputChange}/>
                        </div>
                        <Checkbox id='registrar_servidor' name='registrar_servidor' opciones={['Registrar nuevo']} manejador={habilitarServidor} />
                    </div>
    
                        
                    <div className="absolute bottom-4 right-1/3">
                        <Button width={32}>Actualizar</Button>
                    </div>
                    <div className="absolute bottom-4 left-1/3">
                        <Button color='red' width={32} >Cancelar</Button>
                    </div>
    
                </form>
                
    
            </Container>
        )
    }
};

export default ActualizarBD;