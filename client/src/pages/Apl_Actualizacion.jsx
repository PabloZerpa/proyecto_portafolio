
import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';
import { Form, Button, Typography, Divider } from "antd";
import { Container, Grid } from "../styles/Container.styles";
import Formulario from "../components/Formulario";
const { Title } = Typography;

function Actualizacion() {

  const location = useLocation();
  const navigate = useNavigate();
  const [valor, setValor] = useState("");
  const { paramsId } = useParams();
  
  useEffect(() => {
    console.log(location.state);
    setValor(location.state);
  }, [paramsId]);

  if(valor === null) return <Navigate to='/' />

  return (
    <Container>
        <Form className="aplicaciones start" layout="vertical"
          fields={[
              { name: ["acronimo"], value: valor.acronimo, },
              { name: ["estatus"], value: valor.estatus, },
              { name: ["nombre"], value: valor.nombre, },
              { name: ["descripcion"], value: valor.descripcion, },
              { name: ["prioridad"], value: valor.prioridad, },
              { name: ["tipo"], value: valor.tipo, },
              { name: ["mantenido"], value: valor.responsable, },
              { name: ["desarrollado"], value: valor.responsable, },
              { name: ["clientes"], value: valor.clientes, },
              { name: ["plataforma"], value: valor.plataforma, },
              { name: ["alcance"], value: valor.alcance, },
              { name: ["codigofuente"], value: valor.codigo, },
              { name: ["programafuente"], value: valor.fuente, },
              { name: ["servidor"], value: valor.servidor, },
              { name: ["region"], value: valor.region, },
          ]}
        >

        <Title level={3}>Informacion Basica</Title>

        <Grid>

          <Formulario label="Acronimo" name="acronimo" tipo="input" datos={valor.acronimo} />
              
          <Formulario label="Estatus" name="estatus" tipo="select" 
            opciones={[
              { value: "desarrollo", label: "Desarrollo" },
              { value: "activo", label: "Activo" },
              { value: "inactivo", label: "Inactivo" }
            ]}
          />
            
          <Formulario label="Nombre" name="nombre" tipo="area" datos={valor.nombre} />
              
          <Formulario label="Descripcion" name="descripcion" tipo="area" datos={valor.descripcion} />

          <Formulario label="Prioridad" name="prioridad" tipo="select" datos={valor.prioridad}
            opciones={[
              { value: "alta", label: "Alta" },
              { value: "medio", label: "Medio" },
              { value: "baja", label: "Baja" }
            ]} 
          />

          <Formulario label="Tipo de Aplicacion" name="tipo" tipo="select" 
            opciones={[
              { value: "administrativo", label: "Administrativo" },
              { value: "tecnico", label: "Tecnico" }
            ]} 
          />

            
          <Formulario label="Mantenido" name="mantenido" tipo="input" datos={valor.responsable} />

          <Formulario label="Desarrollado" name="desarrollado" tipo="input" datos={valor.responsable} />

            
          <Formulario label="Datos Clientes" name="clientes" tipo="input" datos={valor.clientes} />

          <Formulario label="Plataforma" name="plataforma" tipo="input" datos={valor.plataforma} />

          </Grid>

          <Divider />
          <Title level={3}>Caracteristicas de la Aplicaciones</Title>

          <Grid>

            <Formulario label="Alcance" name="alcance" tipo="select" 
              opciones={[
                { value: "corporativo", label: "Corporativo" },
                { value: "alto", label: "Alto" }
              ]} 
            />

            <Formulario label="Codigo fuente" name="codigofuente" tipo="select" 
              opciones={[
                { value: "si", label: "SI" },
                { value: "no", label: "NO" }
              ]} 
            />

            <Formulario label="Programa fuente" name="programafuente" tipo="select" 
              opciones={[
                { value: "propoio", label: "Propio" },
                { value: "terceros", label: "Terceros" }
              ]} 
            />

            <Formulario label="Ultima modificacion" name="fecha" tipo="date" />

          </Grid>

          <Divider />
          <Title level={3}>Informacion de Gestion de la Plataforma</Title>

            <Grid>
              <Formulario label="Region Responsable" name="region" tipo="select" 
                opciones={[
                  { value: "oriente", label: "Oriente" },
                  { value: "centro", label: "Centro" },
                  { value: "andes", label: "Andes" }
                ]} 
              />

              <Formulario label="Servidores" name="servidor" tipo="input" datos={valor.servidores} />
            </Grid>

          <Divider />
          <div className="buttonGroup">
            <Button type="primary" danger onClick={() => navigate(-1)}>Cancelar</Button>

            <Button type="primary" htmlType="submit" >Guardar</Button>
          </div>

        </Form>
          
      </Container>
  )
};

export default Actualizacion;