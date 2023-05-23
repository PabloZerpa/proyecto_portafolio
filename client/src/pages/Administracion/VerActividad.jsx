
import { useState, useEffect } from "react";
import { Button } from "../../components/";
import DataTable from "react-data-table-component";
import { paginacionOpciones } from "../../utils/TablaOpciones";

function VerActividad({setIsOpen, valores}) {

    const [resultados, setResultados] = useState([]);

    useEffect(() => {
        setResultados(valores);
    }, []);

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
        <div className="flex flex-col space-y-8 justify-center items-center rounded bg-zinc-400 p-4">
          {/* --------------- SI HAY RESULTADOS, MUESTRA LA TABLA --------------- */}
          {resultados ? (
            <div className="w-full flex flex-col items-center space-y-4">
              <h2 className="text-black text-xl font-bold">{`Actividad de ${resultados[0] ? resultados[0].indicador : null}`}</h2>
              <DataTable
                columns={columns}
                data={resultados}
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

          <div className="flex space-x-16">
            <Button width={32} manejador={(e) => setIsOpen(false)} >Cerrar</Button>
          </div> 
        </div>
    );
}

export default VerActividad;