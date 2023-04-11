
import { useEffect, useState } from "react";
import { Container, Select, } from "../../components";



const opcionRegion = ['TODAS', 'CENTRO', 'CENTRO SUR', 'CENTRO OCCIDENTE','ORIENTE NORTE', 
'ORIENTE SUR', 'OCCIDENTE','FAJA','METROPOLITANA',];

const opcionLocalidad = ['TODAS'];
const localidadCentro = ['APURE', 'CALABOZO', 'GUACARA', 'MARACAY','SAN FELIPE', 'VALENCIA'];
const localidadCentroSur = ['SAN CARLOS', 'MINAS DE RIECITO', 'VALLE DE LA PASCUA'];
const localidadCentroOccidente = [ 'MIRANDA', 'PUERTO AYACUCHO', 'VARGAS'];
const localidadOrienteNorte = ['ANACO', 'SAN ORQUE', 'BARCELONA', 'CARUPANO','CUMANA', 'NUEVA ESPARTA'];
const localidadOrienteSur = ['MATURIN', 'MORICHAL', 'QUIRIQUIRE', 'TEMBLADOR'];
const localidadOccidente = ['ALTAGRACIA', 'BARINAS', 'BARQUISIMETO', 'CIUDAD OJEDA','INTERNACIONAL', 'MARACAIBO', 'MERIDA'];
const localidadFaja = ['AYACUCHO', 'SAN TOME', 'CARABOBO', 'PUERTO ORDAZ'];
const localidadMetropolitana = ['CARACAS', 'CHARALLAVE', 'GUARICO', 'INTERNACIONAL','LOS TEQUES'];


function BaseDatos() {

    const [datos, setDatos] = useState({region: '', localidad: ''});
    const [opcion1, setOpcion1] = useState(opcionLocalidad);
    const [opcion2, setOpcion2] = useState(opcionLocalidad);
    const [opcion3, setOpcion3] = useState(opcionLocalidad);

    function cambioDeOpcion(valor, elemento){

        console.log(valor);

        if(valor === 'CENTRO')
            elemento(localidadCentro);
        else if(valor === 'FAJA')
            elemento(localidadFaja);
        else if(valor === 'METROPOLITANA')
            elemento(localidadMetropolitana);
        else
            elemento(opcionLocalidad);
        
        console.log(opcion1);
    }

    // FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS
    const handleInputChange = (e) => {
        console.log(e.target.name);

        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })

        if(e.target.name === 'region_res')
            cambioDeOpcion(e.target.value, setOpcion1);
        else if(e.target.name === 'region_ser')
            cambioDeOpcion(e.target.value, setOpcion2);
        else if(e.target.name === 'region_bas')
            cambioDeOpcion(e.target.value, setOpcion3);
    }

    return(
        <Container>

            <Select campo='Region' name='region_res' opciones={opcionRegion} manejador={handleInputChange} />
            <Select campo='Localidad' name='localidad' opciones={opcion1} manejador={handleInputChange} />

            <Select campo='Region' name='region_ser' opciones={opcionRegion} manejador={handleInputChange} />
            <Select campo='Localidad' name='localidad' opciones={opcion2} manejador={handleInputChange} />

            <Select campo='Region' name='region_bas' opciones={opcionRegion} manejador={handleInputChange} />
            <Select campo='Localidad' name='localidad' opciones={opcion3} manejador={handleInputChange} />

            {/* <form name="f1"> 
                <select name='pais' onChange={(e) => {cambioDeOpcion(e.target.value)}}> 
                    <option value="0" selected>Seleccione... </option>
                    <option value="CENTRO">CENTRO</option>
                    <option value="FAJA">FAJA</option>
                    <option value="METROPOLITANA">METROPOLITANA</option>
                </select>
                
                <select name='provincia'> 
                    {opcionActual.map((opcion, index) => {
                        return(
                            <option key={index} value={opcion}>{opcion}</option>
                        )
                    })}
                </select> 
            </form> */}

        </Container>
        
    )
};

export default BaseDatos;