
import { useEffect, useState } from "react";
import { Button, Container, Input, Select } from "../../components/";
import { FaUserEdit, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { frameworkCPP, frameworkCS, frameworkJAVA, frameworkJS, frameworkPY, frameworkPhp, opcionLenguaje, opcionLocalidad } from "../../services/campos.service";
import swal from 'sweetalert';

const defaultState = {
    lenguaje: "",
    framework: "",
  };


function Row({ onRemove, numero }) {
    
    const [opcion, setOpcion] = useState(opcionLocalidad);
    const [datos, setDatos] = useState({
        lenguaje: "",
        framework: "",
    });

    const handleInputChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)

        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })

        if(e.target.name === `lenguajes${numero}`)
            cambioDeOpcion(e.target.value, setOpcion);

    }

    function cambioDeOpcion(valor, elemento){
        console.log(valor);
        if(valor === 'PHP')
            elemento(frameworkPhp);
        else if(valor === 'JAVASCRIPT')
            elemento(frameworkJS);
        else if(valor === 'JAVA')
            elemento(frameworkJAVA);
        else if(valor === 'C++')
            elemento(frameworkCPP);
        else if(valor === 'C#')
            elemento(frameworkCS);
        else if(valor === 'PYTHON')
            elemento(frameworkPY);
    }

    return (
      <div className="flex justify-center items-center gap-8">
        <Select campo='Lenguaje' name={`lenguajes${numero}`} opciones={opcionLenguaje} manejador={handleInputChange} />
        <Select campo='Framework' name={`framework${numero}`} opciones={opcion} manejador={handleInputChange} />
        <Button color="red" accion={onRemove}>Remover</Button>
      </div>
    );
  }

function CrearUsuario() {

    const [inputs, setInputs] = useState([defaultState]);
    
    const agregarInput = () => {
        setInputs(inputs.concat(defaultState));
    };
    
    const removerInput = index => {
        if(index > 0){
            const copyinputs = [...inputs];
            copyinputs.splice(index, 1);
            setInputs(copyinputs);
        }
    };

    const mostrarAlerta = (texto,tipo) => {
        console.log(texto);
        console.log(tipo);
        swal(
            {
                //title: 'HOLA',
                text: `${texto}`,
                icon: `${tipo}`,
                button: false,
                timer: '2000'
            }
        );
    }

    return(
        <Container>
            <ul className="grid grid-cols-2 gap-4">
                <Link to="/administracion/permisos/crear" className="flex items-center justify-between w-72 p-4 text-gray-600 bg-white border-2 border-white rounded-lg cursor-pointer hover:text-blue-500 hover:border-blue-500">            
                    <div className="block">
                        <FaUserPlus className="text-2xl" />
                        <div className="w-full text-lg font-semibold">Crear Usuario</div>
                    </div>
                </Link>

                <Link to="/administracion/permisos/buscar" className="flex items-center justify-between w-72 p-4 text-gray-600 bg-white border-2 border-white rounded-lg cursor-pointer hover:text-blue-500 hover:border-blue-500">            
                    <div className="block">
                        <FaUserEdit className="text-2xl" />
                        <div className="w-full text-lg font-semibold">Editar Usuario</div>
                    </div>
                </Link>
            </ul>

            <button onClick={(e) => {mostrarAlerta('HOLA','success')}}>Alerta</button>

            {inputs.map((row, index) => (
                <Row
                {...row}
                    onRemove={() => removerInput(index)}
                    numero={index+1}
                    key={index}
                />
            ))}
            <Button accion={agregarInput}>Agregar</Button>

        </Container>
    );
}

export default CrearUsuario;