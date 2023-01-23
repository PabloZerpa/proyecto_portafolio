
import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, Navigate } from 'react-router-dom';
import { Form, Button, Typography, Divider } from "antd";
import { Container, Grid } from "../styles/Container.styles";
import Formulario from "../components/Formulario";

import Autorizacion from '../services/auth.service';
import Usuarios from '../services/user.service';
import { FormContainer } from "../styles/Container.styles";
import { Input, Select, DatePicker } from "antd";
const { TextArea } = Input;
const { Title } = Typography;

function Actualizacion() {

  const location = useLocation();
  const navigate = useNavigate();
  const [valor, setValor] = useState("");
  const { paramsId } = useParams();

  const [acronimo, setAcronimo] = useState('');
  const [nombre, setNombre] = useState('');
  const [region, setRegion] = useState('');
  const [responsable, setResponsable] = useState('');
  const [prioridad, setPrioridad] = useState('');
  const [ultima, setUltima] = useState('29/2/2024');
  
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

  // -------------------- FUNCION PARA ACTUALIZAR DATOS --------------------
  async function updateData(e) {
    
    e.preventDefault();
    console.log('UPDATE');

    try {
      console.log('TRY DEL UPDATE');
      console.log(acronimo,nombre,region,responsable,prioridad,ultima);
      await Autorizacion.actualizarDatos(acronimo,nombre,region,responsable,prioridad,ultima,location.state.id);
      navigate("/dashboard");
    } 
    catch (error) {
      console.log('ERROR AL ACTUALIZAR APL_ACT');
    }

  }

  if(valor === null) return <Navigate to='/' />

  return (
    <Container>
        <Form className="aplicaciones start" layout="vertical" onSubmitCapture={updateData}
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

          <FormContainer>
              <Form.Item className="formItem" label="Acronimo" name="acronimo" >
                  <Input allowClear className="input" placeholder="Acronimo" onChange={(e) => {setAcronimo(e.target.value)}} /> 
              </Form.Item>
          </FormContainer>

          <FormContainer>
              <Form.Item className="formItem" label="Estatus" name="estatus" >
                <Select
                  style={{ width: 200,}}
                  placeholder="Estatus"
                  options={[
                    { value: "desarrollo", label: "Desarrollo" },
                    { value: "activo", label: "Activo" },
                    { value: "inactivo", label: "Inactivo" }
                  ]}
                  className="select"
              /> 
            </Form.Item>
          </FormContainer>

          <FormContainer>
            <Form.Item className="formItem" label="Nombre" name="nombre" >
                <TextArea allowClear className="input" rows={3} placeholder="Nombre" onChange={(e) => {setNombre(e.target.value)}} /> 
            </Form.Item>
          </FormContainer>

          <FormContainer>
            <Form.Item className="formItem" label="Descripcion" name="descripcion" >
                <TextArea allowClear className="input" rows={3} placeholder="Descripcion" /> 
            </Form.Item>
          </FormContainer>

          <FormContainer>
              <Form.Item className="formItem" label="Prioridad" name="prioridad" >
                <Select
                  style={{ width: 200,}}
                  placeholder="Prioridad"
                  onChange={(e) => {setPrioridad(e)}}
                  options={[
                    { value: "alta", label: "Alta" },
                    { value: "medio", label: "Medio" },
                    { value: "baja", label: "Baja" }
                  ]}
                  className="select"
              /> 
            </Form.Item>
          </FormContainer>

          <FormContainer>
              <Form.Item className="formItem" label="Tipo de Aplicacion" name="tipo" >
                <Select
                  style={{ width: 200,}}
                  placeholder="Tipo de Aplicacion"
                  options={[
                    { value: "administrativo", label: "Administrativo" },
                    { value: "tecnico", label: "Tecnico" }
                  ]} 
                  className="select"
              /> 
            </Form.Item>
          </FormContainer>

          <FormContainer>
              <Form.Item className="formItem" label="Mantenido" name="mantenido" >
                  <Input allowClear className="input" placeholder="Mantenido" onChange={(e) => {setResponsable(e.target.value)}} />
              </Form.Item>
          </FormContainer>

          <FormContainer>
              <Form.Item className="formItem" label="Desarrollado" name="desarrollado" >
                  <Input allowClear className="input" placeholder="Desarrollado" />
              </Form.Item>
          </FormContainer>

          <FormContainer>
              <Form.Item className="formItem" label="Datos Clientes" name="clientes" >
                  <Input allowClear className="input" placeholder="Datos Clientes" /> 
              </Form.Item>
          </FormContainer>

          <FormContainer>
              <Form.Item className="formItem" label="Plataforma" name="plataforma" >
                  <Input allowClear className="input" placeholder="Plataforma" /> 
              </Form.Item>
          </FormContainer>

        </Grid>

          <Divider />
          <Title level={3}>Caracteristicas de la Aplicaciones</Title>

          <Grid>
            
            <FormContainer>
                <Form.Item className="formItem" label="Alcance" name="alcance" >
                  <Select
                    style={{ width: 200,}}
                    placeholder="Alcance"
                    options={[
                      { value: "corporativo", label: "Corporativo" },
                      { value: "alto", label: "Alto" }
                    ]} 
                    className="select"
                /> 
              </Form.Item>
            </FormContainer>

            <FormContainer>
                <Form.Item className="formItem" label="Codigo fuente" name="codigofuente" >
                  <Select
                    style={{ width: 200,}}
                    placeholder="Codigo fuente"
                    options={[
                      { value: "si", label: "SI" },
                      { value: "no", label: "NO" }
                    ]}
                    className="select"
                /> 
              </Form.Item>
            </FormContainer>

            <FormContainer>
                <Form.Item className="formItem" label="Programa fuente" name="programafuente" >
                  <Select
                    style={{ width: 200,}}
                    placeholder="Programa fuente"
                    options={[
                      { value: "propio", label: "Propio" },
                      { value: "terceros", label: "Terceros" }
                    ]}
                    className="select"
                /> 
              </Form.Item>
            </FormContainer>
            
            <FormContainer>
              <Form.Item className="formItem" label="Ultima modificacion" name="fecha" >
                <DatePicker className="input" />
              </Form.Item>
            </FormContainer>

          </Grid>

          <Divider />
          <Title level={3}>Informacion de Gestion de la Plataforma</Title>

            <Grid>

              <FormContainer>
                  <Form.Item className="formItem" label="Region" name="region" >
                    <Select
                      style={{ width: 200,}}
                      placeholder="Region"
                      onChange={(e) => {setRegion(e)}}
                      options={[
                        { value: "oriente", label: "Oriente" },
                        { value: "centro", label: "Centro" },
                        { value: "andes", label: "Andes" }
                      ]}
                      className="select"
                  /> 
                </Form.Item>
              </FormContainer>

              <FormContainer>
                <Form.Item className="formItem" label="Servidores" name="servidor" >
                    <Input allowClear className="input" placeholder="Servidores" /> 
                </Form.Item>
              </FormContainer>
              
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