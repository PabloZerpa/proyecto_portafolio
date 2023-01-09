
import Grid from "../components/Grid";
import Formulario from "../components/Formulario";
import { Form, Button, Typography, Divider } from "antd";
import { Container } from "../styles/Container.styles";
const { Title } = Typography;

function Aplicaciones() {

    return (
        <Container>
          <Form className="aplicaciones start" layout="vertical">

            <Title level={3}>Informacion Basica</Title>

            <div className='cuadricula'>

                <Formulario label="Acronimo" name="acronimo" tipo="input" />
                
                <Formulario label="Estatus" name="estatus" tipo="select" 
                    opciones={[
                      { value: "desarrollo", label: "Desarrollo" },
                      { value: "activo", label: "Activo" },
                      { value: "inactivo", label: "Inactivo" }
                    ]} 
                  />

              
                <Formulario label="Nombre" name="nombre" tipo="area" />
                
                <Formulario label="Descripcion" name="escripcion" tipo="area" />

                <Formulario label="Criticidad" name="criticidad" tipo="select" 
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

              
                <Formulario label="Mantenido" name="mantenido" tipo="input" />

                <Formulario label="Desarrollado" name="desarrollado" tipo="input" />

              
                <Formulario label="Datos Clientes" name="clientes" tipo="input" />

                <Formulario label="Plataforma" name="plataforma" tipo="input" />

            </div>

            <Divider />
            <Title level={3}>Caracteristicas de la Aplicaciones</Title>

            <div className='cuadricula'>

              <Formulario label="Alcance/Impacto" name="alcance/impacto" tipo="select" 
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

              <Formulario label="Fecha de implantacion" name="implantacion" tipo="date" />

            </div>

            <Divider />
            <Title level={3}>Informacion de Gestion de la Plataforma</Title>

              <div className='cuadricula'>
                <Formulario label="Region Responsable" name="region" tipo="select" 
                    opciones={[
                    { value: "oriente", label: "Oriente" },
                    { value: "centro", label: "Centro" },
                    { value: "andes", label: "Andes" }
                  ]} 
                />

                <Formulario label="Servidores" name="servidores" tipo="input" />
              </div>

            <Divider />
            <div className="buttonGroup">
              <Button type="primary" danger >Cancelar</Button>

              <Button type="primary" htmlType="submit" >Guardar</Button>
            </div>

          </Form>
            
        </Container>
          
    )
};

export default Aplicaciones;