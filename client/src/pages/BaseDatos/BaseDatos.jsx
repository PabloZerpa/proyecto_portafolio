
import { Button, Container, Input, Select, Tabla } from "../../components";
import Radio from "../../components/Radio";
import Tabla3 from "../../components/Table3";

const columnas = ['Acronimo','Nombre','Estatus','Prioridad','Region','Cliente','Plataforma'];
const resultados = [
    {acronimo:'ABC',nombre:'QWERTY',estatus:'DESARROLLO',prioridad:'ALTA',region:'CENTRO',cliente:'PDVSA',plataforma:'WEB'},
    {acronimo:'DEF',nombre:'ASDF',estatus:'ACTIVO',prioridad:'MEDIA',region:'ORIENTE',cliente:'PDVSA',plataforma:'ESCRITORIO'},
    {acronimo:'GHI',nombre:'XYZ',estatus:'INACTIVO',prioridad:'BAJA',region:'OCCIDENTE',cliente:'DESCONOCIDO',plataforma:'MOVIL'},
];


function BaseDatos() {

    function saludo(e){
        e.preventDefault();
        console.log('SALUDO');
    }

    return(
        <Container>

            <Tabla3 columnas={columnas} datos={resultados} />

        </Container>

    )
};

export default BaseDatos;