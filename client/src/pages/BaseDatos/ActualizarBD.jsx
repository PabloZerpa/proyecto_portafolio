
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, Checkbox, Container, Input, Select } from '../../components';
import Autorizacion from '../../services/auth.service';
import Usuarios from '../../services/user.service';
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
            console.log(datos.select_servidor);
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
        console.log(e.target.name)
        console.log(e.target.value)

        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })
    }

    useEffect(() => {
        async function fetchData(){
            try {
                const valores = await Usuarios.obtenerGeneralBD(id);
                setValor(valores); 
                console.log(valores);
                setLoad(false); 

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
    
    return (
        <Container>
            <h1 className='font-bold text-lg'>Actualizacion de Base de datos</h1>

            <form className="flex flex-col relative w-3/4 bg-zinc-400 p-4 pb-24 mb-10 rounded drop-shadow-md" onSubmit={updateData}>
                
                <h2 className='font-bold text-base mb-6'>Informacion General</h2>

                <Input campo='Nombre' name='base_nombre' editable={true} area={true} manejador={handleInputChange} />
                <div className="relative grid grid-cols-2 gap-4 mb-0">
                    <Select campo='Estatus' name='estatus' opciones={['SELECCIONE','DESARROLLO','ESTABILIZACION','MANTENIMIENTO']} manejador={handleInputChange}/>
                    <Select campo='Tipo' name='tipo' opciones={['SELECCIONE','RELACIONAL','NO RELACIONAL','DISTRIBUIDA']} manejador={handleInputChange} />
                    <Select campo='Manejador' name='manejador' opciones={['SELECCIONE','MYSQL','POSTGRESS','ORACLE',]} manejador={handleInputChange} />
                    <Input campo='Version' name='version_manejador' editable={true} manejador={handleInputChange} />
                    <Select campo='Ambiente' name='tipo_ambiente' opciones={['SELECCIONE','DESARROLLO','ESTABILIZACION','MANTENIMIENTO']} manejador={handleInputChange} />
                    <Input campo='N° Usuario' name='cantidad_usuarios' editable={true} manejador={handleInputChange} />
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
};

export default ActualizarBD;