
import DataTable from "react-data-table-component";
import { paginacionOpciones } from "../../utils/TablaOpciones";
import { FaTimes } from "react-icons/fa";

function VerActividad({setIsOpen, valores}) {

    const columns = [
      {
          name: 'Descripcion',
          selector: row => row.mensaje,
          sortable: true,
          width: '300px',
          left: true
      },
      {
          name: 'Direccion IP',
          selector: row => row.ip,
          sortable: true,
          width: '150px',
          left: true
      },
      {
          name: 'Fecha',
          selector: row => row.fecha,
          sortable: true,
          width: '150px',
          left: true
      },
    ];

    return(
        <div className="relative flex flex-col space-y-4 justify-center items-center rounded bg-zinc-400 p-2">
          <FaTimes className="absolute top-2 right-2 text-xl text-black cursor-pointer" onClick={(e) => setIsOpen(false)} />
          {/* --------------- SI HAY RESULTADOS, MUESTRA LA TABLA --------------- */}
          {valores ? (
            <div className="w-full flex flex-col items-center space-y-3">
              <h2 className="text-black text-lg font-bold">{`Actividad de ${valores[0] ? valores[0].indicador : null}`}</h2>
              <DataTable
                columns={columns}
                data={valores}
                pagination
                paginationComponentOptions={paginacionOpciones}
                paginationRowsPerPageOptions={[10,20,30,50,100]}
                noDataComponent={"SIN RESULTADOS"}
                fixedHeader
                fixedHeaderScrollHeight="220px"
                highlightOnHover
                pointerOnHover
                dense
              />
            </div>
          ) : 
          (null)}

        </div>
    );
}

export default VerActividad;