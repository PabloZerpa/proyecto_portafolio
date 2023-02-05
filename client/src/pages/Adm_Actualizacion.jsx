
import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';
import Button from '../components/Button';
import Input from '../components/Input';
import Select from '../components/Select';
import Autorizacion from '../services/auth.service';
import Usuarios from '../services/user.service';

const campos1 = ['Acronimo','Estatus','Nombre','Descripcion','Prioridad',
'Tipo','Responsable Funcional','Responsable Tecnico','Departamento',
'Numero de usuarios','Plataforma'];
const campos2 = ['Alcance','Codigo Fuente','Propiedad','Fecha'];
const campos3 = ['Region','Servidor'];

function Actualizacion() {

  const location = useLocation();
  const navigate = useNavigate();
  const [valor, setValor] = useState("");
  const [valorArray, setValorArray] = useState([]);
  const { paramsId } = useParams();

  const [acronimo, setAcronimo] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [estatus, setEstatus] = useState('');
    const [region, setRegion] = useState('');
    const [responsablef, setResponsableF] = useState('');
    const [responsablef_ind, setResponsableF_ind] = useState('');
    const [responsablef_tlf, setResponsableF_tlf] = useState('');
    const [responsablef_cor, setResponsableF_cor] = useState('');
    const [responsablet, setResponsableT] = useState('');
    const [responsablet_ind, setResponsableT_ind] = useState('');
    const [responsablet_tlf, setResponsableT_tlf] = useState('');
    const [responsablet_cor, setResponsableT_cor] = useState('');
    const [prioridad, setPrioridad] = useState('');
    const [tipo, setTipo] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [codigo, setCodigo] = useState('');
    const [lenguaje, setLenguaje] = useState('');
    const [baseDatos, setBaseDatos] = useState('');
    const [alcance, setAlcance] = useState('');
    const [propiedad, setPropiedad] = useState('');
    const [servidor, setServidor] = useState('');
    const [ultima, setUltima] = useState('29/2/2024');
  
  useEffect(() => {
    console.log(location.state);

    async function fetchData(){
      try {
        const response = await Usuarios.obtenerDato(location.state.id)
        setValor(response.data);
        setValorArray(Object.values(response.data));
        
        setAcronimo(location.state.acronimo);
        setEstatus(location.state.estatus);
        setNombre(location.state.nombre);
        setDescripcion(location.state.descripcion);
        setRegion(location.state.region);
        setResponsableF(location.state.responsablef);
        setPrioridad(location.state.prioridad);
        setCodigo(location.state.codigo_fuente);
        setLenguaje(location.state.lenguaje);
        setBaseDatos(location.state.base_datos);
        setPropiedad(location.state.propiedad);
        setPlataforma(location.state.plataforma);
        setServidor(location.state.servidor);
        setAlcance(location.state.alcance);
        setTipo(location.state.tipo);
        setCantidad(location.state.cantidad_user);
        setDepartamento(location.state.departamento);
      } 
      catch (error) {
        console.log(error)
      }
    }
    fetchData();

  }, [paramsId]);

  // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
  async function updateData(e) {
    
    e.preventDefault();
    console.log('UPDATE');

    try {
      console.log('TRY DEL UPDATE');
      console.log(acronimo,nombre,region,responsablef,prioridad,ultima);
      await Autorizacion.actualizarDatos(
        acronimo,estatus,nombre,descripcion,region,responsablef,prioridad,tipo,
        departamento,cantidad,alcance,propiedad,plataforma,codigo,servidor,ultima,location.state.id);

      navigate("/dashboard");
    }
    catch (error) { console.log('ERROR AL ACTUALIZAR APL_ACT'); }
  }

  if(valor === null) return <Navigate to='/' />

  return (
    <div className="flex w-full bg-zinc-300 m-0 p-0">
      <div className="w-full flex flex-col justify-start items-center gap-8 pt-44 pl-56" >

      <h2 className='font-bold'>Actualizacion de Aplicacion</h2>

      <form className="w-3/4 bg-zinc-400 p-4 mb-10 rounded drop-shadow-md" onSubmitCapture={updateData} >

            <div className="grid gap-6 mb-6 md:grid-cols-2">
                <Input campo={'Acronimo'} propiedad={valor.acronimo} editable={true} />
                <Select campo='Estatus' opciones={['Desarrollo','Activo','Inactivo',]} />
            </div>

            <Input campo={'Nombre'} propiedad={valor.nombre} editable={true} area={true} />
            <Input campo={'Descripcion'} propiedad={valor.descripcion} editable={true} area={true} />

            
            <div className="relative grid gap-6 mb-6 md:grid-cols-2">
                <Select campo='Prioridad' opciones={['Alta','Media','Baja',]} />
                <Select campo='Tipo de Aplicacion' opciones={['Tecnico','Administrativo']} />

                <div className='flex flex-col'>
                    <Input campo={'Responsable Funcional'} propiedad={valor.responsablef} editable={true} />
                    <Input campo={'Indicador'} propiedad={valor.responsablef_ind} editable={true} />
                    <Input campo={'Telefono'} propiedad={valor.responsablef_tlf} editable={true} />
                    <Input campo={'Correo'} propiedad={valor.responsablef_cor} editable={true} />
                </div>

                <div className='relative flex flex-col'>
                    <div className='absolute -left-4 top-4 w-1 h-80 border-2 border-dashed border-gray-500'></div>
                    <Input campo={'Responsable Tecnico'} propiedad={valor.responsablet} editable={true} />
                    <Input campo={'Indicador'} propiedad={valor.responsablet_ind} editable={true} />
                    <Input campo={'Telefono'} propiedad={valor.responsablet_tlf} editable={true} />
                    <Input campo={'Correo'} propiedad={valor.responsablet_cor} editable={true} />
                </div>

                <Input campo={'Departamento'} propiedad={valor.departamento} editable={true} />
                <Input campo={'N° de Usuarios'} propiedad={valor.cantidad_user} editable={true} />
                <Input campo={'Plataforma'} propiedad={valor.plataforma} editable={true} />
                <Input campo={'Direccion'} propiedad={valor.direccion} editable={true} />
                
                <Select campo='Codigo Fuente' opciones={['Si','No']} />
                <Input campo={'Lenguaje'} propiedad={valor.lenguaje} editable={true} />
                <Select campo='Base de Datos' opciones={['Si','No']} />
                <Select campo='Alcance' opciones={['Alto','Corporativo']} />

                {/* <div className='absolute bottom-52 w-full border-dashed border-gray-500'></div> */}
                <Select campo='Propiedad' opciones={['Propio','Tercero']} />
                <Input campo={'Fecha de Creacion'} propiedad={valor.ultima} editable={true} />
                <Select campo='Region' opciones={['Oriente','Centro','Andes']} />
                <Input campo={'Servidor'} propiedad={valor.servidor} editable={true} />
          </div>

          <div className="flex justify-center items-center gap-20 py-2">
            <Button color='red' onClick={() => navigate('/aplicaciones')} >Cancelar</Button>
            <Button color='blue' >Guardar</Button>
          </div>

        </form>

      </div>
    </div>
  )
};

export default Actualizacion;