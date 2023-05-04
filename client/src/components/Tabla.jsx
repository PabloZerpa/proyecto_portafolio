
import DataTable from "react-data-table-component";
import { paginacionOpciones } from '../utils/TablaOpciones'
import { useEffect, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";

function Delayed() {
	const [columns, setColumns] = useState([]);
	const [pending, setPending] = useState(true);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setColumns([
				{
					name: 'Name',
					selector: row => row.name,
					sortable: true,
				},
				{
					name: 'Email',
					selector: row => row.email,
					sortable: true,
				},
				{
					name: 'Address',
					selector: row => row.address,
					sortable: true,
				},
			]);
			setPending(false);
		}, 2000);
		return () => clearTimeout(timeout);
	}, []);
}

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