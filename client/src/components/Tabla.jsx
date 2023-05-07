
import DataTable from "react-data-table-component";
import { paginacionOpciones } from '../utils/TablaOpciones'
import { BiLoaderAlt } from "react-icons/bi";

function Tabla({columnas, datos, paginacion=false, pending=false}) {

    return (
        <>
            <DataTable
                columns={columnas}
                data={datos}
                highlightOnHover
                pointerOnHover
                dense
                noDataComponent={"SIN RESULTADOS"}
                fixedHeader
                fixedHeaderScrollHeight="600px"
                pagination={paginacion}
                paginationComponentOptions={paginacionOpciones}
                paginationRowsPerPageOptions={[10,20,30,50,100]}
                progressPending={pending}
                progressComponent={<BiLoaderAlt className='text-5xl text-blue-500 animate-spin' />}
            />
        </>
    );
}

export default Tabla;