
import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, Navigate, Link } from 'react-router-dom';
import { Form, Button, Typography, Divider, Alert } from "antd";
import { Container, Grid } from "../styles/Container.styles";
import Formulario from "../components/Formulario";
import Usuarios from '../services/user.service';
const { Title, Text } = Typography;


function Vista() {
  
  const location = useLocation();
  const navigate = useNavigate();
  const [valor, setValor] = useState("");
  const { paramsId } = useParams();
  
  useEffect(() => {
    console.log(location.state);

    async function fetchData(){
      try {
        const response = await Usuarios.obtenerDato(location.state.id)
        setValor(response.data);
      } 
      catch (error) {
        console.log(error)
      }
    }
    fetchData();
  }, [paramsId]);

  if(valor === null) return <Navigate to='/' />

    return (
      <Container>
        <Form className="aplicaciones start" layout="vertical">
          <div className="buttonGroup">
            <Link to={`/aplicaciones/actualizacion/${valor.id}`} state={valor}>Actualizar</Link>

            <Button type="primary" size='small' >Descargar</Button>
          </div>

        <Title level={3}>Informacion Basica</Title>

        <Grid>

          <Form.Item className="formItem" label="Acronimo" name="acronimo">
            <Alert type="info" style={{width: '320px', background: 'white', border: 'none', borderRadius: '5px'}} message={valor.acronimo} />
          </Form.Item>
              
          <Form.Item className="formItem" label="Estatus" name="Estatus">
            <Alert type="info" style={{width: '320px', background: 'white', border: 'none', borderRadius: '5px'}} message="Estatus" />
          </Form.Item>
            
          <Form.Item className="formItem" label="Nombre" name="nombre">
            <Alert type="info" style={{width: '320px', background: 'white', border: 'none', borderRadius: '5px'}} message={valor.nombre} />
          </Form.Item>
              
          <Form.Item className="formItem" label="Descripcion" name="Descripcion">
            <Alert type="info" style={{width: '320px', background: 'white', border: 'none', borderRadius: '5px'}} message="Descripcion" />
          </Form.Item>

          <Form.Item className="formItem" label="Prioridad" name="prioridad">
            <Alert type="info" style={{width: '320px', background: 'white', border: 'none', borderRadius: '5px'}} message={valor.prioridad} />
          </Form.Item>

          <Form.Item className="formItem" label="Tipo" name="tipo">
            <Alert type="info" style={{width: '320px', background: 'white', border: 'none', borderRadius: '5px'}} message="Tipo" />
          </Form.Item>
            
          <Form.Item className="formItem" label="Mantenido" name="mantenido">
            <Alert type="info" style={{width: '320px', background: 'white', border: 'none', borderRadius: '5px'}} message={valor.responsable} />
          </Form.Item>

          <Form.Item className="formItem" label="Desarrollado" name="desarrollado">
            <Alert type="info" style={{width: '320px', background: 'white', border: 'none', borderRadius: '5px'}} message={valor.responsable} />
          </Form.Item>
          
          <Form.Item className="formItem" label="Clientes" name="Clientes">
            <Alert type="info" style={{width: '320px', background: 'white', border: 'none', borderRadius: '5px'}} message="Clientes" />
          </Form.Item>

          <Form.Item className="formItem" label="Plataforma" name="Plataforma">
            <Alert type="info" style={{width: '320px', background: 'white', border: 'none', borderRadius: '5px'}} message="Plataforma" />
          </Form.Item>

          </Grid>

          <Divider />
          <Title level={3}>Caracteristicas de la Aplicaciones</Title>

          <Grid>

            <Form.Item className="formItem" label="Alcance" name="Alcance">
              <Alert type="info" style={{width: '320px', background: 'white', border: 'none', borderRadius: '5px'}} message="Alcance" />
            </Form.Item>

            <Form.Item className="formItem" label="Codigo fuente" name="Codigo fuente">
              <Alert type="info" style={{width: '320px', background: 'white', border: 'none', borderRadius: '5px'}} message="Codigo fuente" />
            </Form.Item>

            <Form.Item className="formItem" label="Programa fuente" name="Programa fuente">
              <Alert type="info" style={{width: '320px', background: 'white', border: 'none', borderRadius: '5px'}} message="Programa fuente" />
            </Form.Item>

            <Form.Item className="formItem" label="Ultima" name="ultima">
              <Alert type="info" size="small" style={{width: '320px', background: 'white', border: 'none', borderRadius: '5px'}} message={valor.ultima} />
            </Form.Item>

          </Grid>

          <Divider />
          <Title level={3}>Informacion de Gestion de la Plataforma</Title>

            <Grid>
              <Form.Item className="formItem" label="Region" name="region">
                <Alert type="info" style={{width: '320px', background: 'white', border: 'none', borderRadius: '5px'}} message={valor.region} />
              </Form.Item>

              <Form.Item className="formItem" label="Servidor" name="Servidor">
                <Alert type="info" style={{width: '320px', background: 'white', border: 'none', borderRadius: '5px'}} message="Servidor" />
              </Form.Item>
            </Grid>

          <Divider />

        </Form>
          
      </Container>
          
    )
};

export default Vista;