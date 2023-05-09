
# aplicaciones **(ED)**
- aplicacion_id **(PK)**
- acronimo
- nombre
- descripcion
- estatus
- prioridad
- critico
- alcance
- plataforma **(FK)**
- lenguaje **(FK)**
- framework **(FK)**
- baseDatos **(FK)**
- servidor **(FK)**
- codigo
- licencia
- version
- idioma

# plataformas **(EC)**
- plataforma_id **(PK)**
- plataforma

# aplicacion_lenguaje **(EP)**
- aplicacion_id **(PK)**
- lenguaje_id **(PK)**

# lenguajes **(ED)**
- lenguaje_id **(PK)**
- lenguaje
- version

# aplicacion_framework **(EP)**
- aplicacion_id **(PK)**
- framework_id **(PK)**

# frameworks **(ED)**
- framework_id **(PK)**
- framework
- version

# aplicacion_base **(EP)**
- aplicacion_id **(PK)**
- base_de_datos_id **(PK)**

# base_de_datos **(ED)**
- base_de_datos_id **(PK)**
- nombre
- estatus
- tipo
- manejador
- version
- cantidad
- direccion
- servidor
- fecha

# aplicacion_servidor **(EP)**
- aplicacion_id **(PK)**
- servidor_id **(PK)**

# servidores **(ED)**
- servidor_id **(PK)**
- nombre
- estatus
- direccion
- sistema
- version
- marca
- modelo
- cantidad_cpu
- velocidad_cpu
- memoria
- ubicacion
- fecha

# fallas **(ED)**
- falla_id **(PK)**
- numero
- clase
- descripcion
- solucion
- impacto
- fecha


## RELACIONES

1. Una **aplicacion** posee muchos **lenguajes** (1 a n)
2. Una **aplicacion** posee muchos **framework** (1 a n)
3. Una **aplicacion** posee muchos **base_de_datos** (1 a n)
4. Una **aplicacion** posee muchos **servidores** (1 a n)
5. Una **aplicacion** posee muchos **plataformas** (1 a 1)


for (const [, value] of Object.entries(productos)) {
    Object.keys(value).forEach(key => value[key] = value[key].toUpperCase());
}

ALTER TABLE empleado 
  ADD CONSTRAINT constraint_name
  FOREIGN KEY (columna_de_la_tabla_a_referenciar) 
  REFERENCES nombre_tabla_padre(columna_de_la_tabla_padre) 
  ON DELETE CASCADE;

* HASHBROWSER
* ESPACIADO EN CREAR USUARIO
* ARREGLAR SWEET ALERT EN OLDER BROWSER
* ESPACIADO DE LOS BOTONES EN REGISTRO APP
* BOTON REGISTRAR FALLA NO FUNCIONA EN OLDER BROWSER
* No carga los valores por defecto en los selects de actualización
* No carga completamente bien los valores por defecto en actualizacion
* Arreglar actualizacion cuando los datos por defectos sean nulos
* Actualizar varios campos por id
* Hacer modulo para custodios
* Proceso de eliminacion de elementos
* Arreglar vista y actualizacion de BD/Servidores


Agregar opciones para seleccionar framework por lenguaje en la tabla de registro
Cambio de contraseña a la primera iniciada de sesion y cada 3 meses
Cerrar sesion por inactividad en client/server de 10 minutos




