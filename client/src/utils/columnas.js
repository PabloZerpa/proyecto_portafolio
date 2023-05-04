
import { frameworkPhp, frameworkJS, frameworkJAVA, frameworkCPP, frameworkCS, frameworkPY } from "../services/campos.service";

const generarColumna = (titulo,key,width) => {
    return{
        name: titulo,
        selector: row => row[key],
        sortable: true,
        left: true,
        width: width,
    }
}

export const columnasModalBD = [
    generarColumna('ID','base_datos_id',null),
    generarColumna('Nombre','base_datos',null),
    generarColumna('Estatus','bas_estatus',null),
    generarColumna('Tipo','tipo',null),
    generarColumna('Manejador','manejador',null),
    generarColumna('N° de Usuarios','bas_cantidad_usuarios',null),
    generarColumna('Ambiente','tipo_ambiente',null),
];


export const columnasModalServidor = [
    generarColumna('ID','servidor_id',null),
    generarColumna('Nombre','servidor',null),
    generarColumna('Estatus','ser_estatus',null),
    generarColumna('Direccion','ser_direccion',null),
    generarColumna('OS','sistema',null),
    generarColumna('Modelo','modelo',null),
    generarColumna('Marca','marca',null),
    generarColumna('Region','region',null),
    generarColumna('Localidad','localidad',null),
    generarColumna('Ultima Actualizacion','ser_fecha_actualizacion',null),
    generarColumna('Por','indicador',null),
];

// const frameworks = ['PHP','JAVASCRIPT','JAVA','C++','C#','VISUAL BASIC','TYPESCRIPT','PYTHON','GO','RUST']

function crearInputs (array) {

    return(
        <>
            {array.map((elemento, index) => {
                if(index > 0){
                    return(
                        <div key={index} className="text-center">
                            <input className='mx-8 rounded' type="checkbox" value={elemento} /> 
                            <label className='text-xs' >{elemento}</label>
                        </div> );
                }
            })}
        </>
    );
}

export const columnasModalLenguaje = [
    generarColumna('Lenguaje ID','lenguaje_id','150px'),
    generarColumna('Lenguaje','lenguaje','200px'),
    {
        name: 'Framework',
        button: true,
        cell: row => {
            console.log(row);
            
            if(row.lenguaje_id === 1){
                return(
                    <div className="flex">
                        {crearInputs(frameworkPhp)}
                    </div>
                )
            }

            if(row.lenguaje_id === 2){
                return(
                    <div className="flex">
                        {crearInputs(frameworkJS)}
                    </div>
                )
            }

            if(row.lenguaje_id === 3){
                return(
                    <div className="flex">
                        {crearInputs(frameworkJAVA)}
                    </div>
                )
            }

            if(row.lenguaje_id === 4){
                return(
                    <div className="flex">
                        {crearInputs(frameworkCPP)}
                    </div>
                )
            }

            if(row.lenguaje_id === 5){
                return(
                    <div className="flex">
                        {crearInputs(frameworkCS)}
                    </div>
                )
            }

            if(row.lenguaje_id === 8){
                return(
                    <div className="flex">
                        {crearInputs(frameworkPY)}
                    </div>
                )
            }
            
        },
        left: true
    },
];

export const columnasModalFramework = [
    generarColumna('Framework ID','framework_id','150px'),
    generarColumna('Framework','framework','200px'),
];

