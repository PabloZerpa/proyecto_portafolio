
import DataTable from "react-data-table-component";
import { paginacionOpciones } from '../utils/TablaOpciones'
 

function Tabla({columnas, datos, paginacion=false}) {
     
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
            />
        </>
    );
}

export default Tabla;