
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
            <Button accion={saludo}>Boton</Button>

            <Input 
                campo='Campo'
                name='name del input' 
                direccion="row"
                propiedad='Valor por defecto'
                manejador={saludo} 
            />

            <Input 
                campo='Campo'
                name='name del input' 
                editable={true} 
                propiedad='Valor por defecto'
                manejador={saludo} 
            />

            <Input 
                campo='Campo'
                name='name del input' 
                area={true}
                propiedad='Valor por defecto'
                manejador={saludo} 
            />

            <Input 
                campo='Campo'
                name='name del input' 
                area={true}
                direccion="row"
                editable={true} 
                propiedad='Valor por defecto'
                manejador={saludo} 
            />

            <Select 
                campo='Campo' 
                name='nombre campo'
                direccion="row"
                opciones={['A','B','C']} 
                busqueda={false}
            />

            <Select 
                campo='Campo' 
                name='nombre campo'
                direccion="row"
                opciones={['A','B','C']} 
                busqueda={true}
            />

            <Select 
                campo='Campo' 
                name='nombre campo'
                opciones={['A','B','C']} 
                busqueda={false}
            />
            
            <Select 
                campo='Campo' 
                name='nombre campo'
                opciones={['A','B','C']} 
                busqueda={true}
            />

            <Radio label='Label' name='name1' opciones={['A','B','C']} manejador={saludo} />
            <Radio label='Label' name='name2' opciones={['D','E','F']} size='big' manejador={saludo} />

            <Tabla3 columnas={columnas} datos={resultados} />

        </Container>

    )
};

export default BaseDatos;