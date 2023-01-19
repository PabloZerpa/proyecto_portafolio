function opciones(label, name, tipo, opc) {
    return { label, name, tipo, opc };
}

export const labels1 = [
    opciones('Acronimo', 'acronimo', 'input',),

    opciones('Estatus', 'estatus', 'select', [
        { value: "desarrollo", label: "Desarrollo" },
        { value: "activo", label: "Activo" },
        { value: "inactivo", label: "Inactivo" }
    ]),
    opciones('Nombre', 'nombre', 'area',),
    opciones('Descripcion', 'descripcion', 'area',),
    opciones('Criticidad', 'criticidad', 'select', [
        { value: "alta", label: "Alta" },
        { value: "medio", label: "Medio" },
        { value: "baja", label: "Baja" }
    ]),
    opciones('Tipo', 'tipo', 'select', [
        { value: "administrativo", label: "Administrativo" },
        { value: "tecnico", label: "Tecnico" }
    ]),
    opciones('Mantenido', 'mantenido', 'input',),
    opciones('Desarrollado', 'desarrollado', 'input',),
    opciones('Cliente', 'cliente', 'input',),
    opciones('Plataforma', 'plataforma', 'input',),

];

export const labels2 = [
    opciones('Alcance', 'select', [
        { value: "corporativo", label: "Corporativo" },
        { value: "alto", label: "Alto" }
    ]),
    opciones('Codigo', 'select', [
        { value: "si", label: "SI" },
        { value: "no", label: "NO" }
    ]),
    opciones('Propio', 'select', [
        { value: "propio", label: "Propio" },
        { value: "terceros", label: "Terceros" }
    ]),
    opciones('Fecha', 'date',),
];

export const labels3 = [
    opciones('Region', 'select', [
        { value: "oriente", label: "Oriente" },
        { value: "centro", label: "Centro" },
        { value: "andes", label: "Andes" }
    ]),
    opciones('Servidores', 'input',),
];

// {labels1.map((item) => (
              
//     <Formulario 
//       key={item.id}
//       label={item.label}
//       name={item.nombre}
//       tipo={item.tipo}
//       datos={valor.name}
//     />
//   ))}