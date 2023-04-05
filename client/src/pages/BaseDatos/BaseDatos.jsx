
import { useEffect, useState } from "react";
import { Button, Container, Input, Select, Tabla } from "../../components";
import Radio from "../../components/Radio";
import Tabla3 from "../../components/Table3";

const columnas = ['Acronimo','Nombre','Estatus','Prioridad','Region','Cliente','Plataforma'];
const resultados = [
    {acronimo:'ABC',nombre:'QWERTY',estatus:'DESARROLLO',prioridad:'ALTA',region:'CENTRO',cliente:'PDVSA',plataforma:'WEB'},
    {acronimo:'DEF',nombre:'ASDF',estatus:'ACTIVO',prioridad:'MEDIA',region:'ORIENTE',cliente:'PDVSA',plataforma:'ESCRITORIO'},
    {acronimo:'GHI',nombre:'XYZ',estatus:'INACTIVO',prioridad:'BAJA',region:'OCCIDENTE',cliente:'DESCONOCIDO',plataforma:'MOVIL'},
];


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

    function saludo(e){
        e.preventDefault();
        console.log('SALUDO');
    }

    const [datos, setDatos] = useState({region: '', localidad: ''});
    const [opcionActual, setOpcionActual] = useState(opcionLocalidad);

    function cambioDeOpcion(valor){
        console.log(valor);
        //OBTENGO LA REGION SELECCIONADA
        console.log(opcionActual);
        const regionSelected = 'CENTRO';

        if(valor === 'CENTRO'){
            setOpcionActual(localidadCentro);
        }
        else if(valor === 'FAJA'){
            setOpcionActual(localidadFaja);
        }
        else if(valor === 'METROPOLITANA'){
            setOpcionActual(localidadMetropolitana);
        }
        else{
            setOpcionActual(opcionLocalidad);
        }
        console.log(opcionActual);
    }

    useEffect(() => {
        cambioDeOpcion();
    }, []);

    // FUNCION PARA OBTENER Y GUARDAR LOS DATOS EN LOS INPUTS
    const handleInputChange = (e) => {
        console.log(e.target.name)
        console.log(e.target.value)

        if(e.target.value === 'TODAS')
            setDatos({ ...datos, [e.target.name] : null })
        else
            setDatos({ ...datos, [e.target.name] : e.target.value })

        cambioDeOpcion(e.target.value);
    }

    return(
        <Container>

            <Select campo='Region' name='region' opciones={opcionRegion} manejador={handleInputChange} />
            <Select campo='Localidad' name='localidad' opciones={opcionActual} manejador={handleInputChange} />

            <form name="f1"> 
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
            </form>


            <Tabla3 columnas={columnas} datos={resultados} />

        </Container>

    )
};

export default BaseDatos;