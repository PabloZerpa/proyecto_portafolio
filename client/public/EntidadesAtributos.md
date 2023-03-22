
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