
import { useState } from 'react';
import { Input, InputNumber, Select, DatePicker, Form, Button, Radio, Divider } from 'antd';
import { SearchArea } from "../styles/Container.styles";
import Usuarios from "../services/user.service";

const { Search } = Input;

function Busqueda() {

    const [resultados, setResultados] = useState([]);

    const onSearch = async (value) => {
        try {
            console.log(value);
            const datos = await Usuarios.obtenerPorTermino(value);
            setResultados(datos);
            console.log(resultados);
        } catch (error) {
            console.log('ERROR AL BUSCAR DATOS');
        }
    }

    return (
        <SearchArea>

            <div className='filtros'>

                <div className="selectArea">
                    <div className="rows">

                        <Form.Item className="formItem" label="ID" name="id">
                            <InputNumber size='small' placeholder='ID' min={1} />
                        </Form.Item>

                        <Form.Item className="formItem" label="Region" name="region">
                            <Select style={{ width: 160,}} placeholder="Region" size='small'
                            options={[
                                { value: "Centro", label: "Centro" },
                                { value: "Oriente", label: "Oriente" },
                                { value: "Andes", label: "Andes" }
                            ]}
                            className="select"
                        /> 
                        </Form.Item>
                    
                        <Form.Item className="formItem" label="Depart" name="departamento">
                            <Select style={{ width: 160,}} placeholder="Departamento" size='small'
                            options={[
                                { value: "Informatica", label: "Informatica" },
                                { value: "Telecomunicaciones", label: "Telecomunicaciones" },
                                { value: "Servidores", label: "Servidores" },
                                { value: "Automatizacion", label: "Automatizacion" },
                            ]}
                            className="select"
                        /> 
                        </Form.Item>

                        <Form.Item className="formItem" label="Año" name="año">
                            <DatePicker size='small' placeholder='Año' picker="year" /> 
                        </Form.Item>

                    </div>
                </div>
                
                <div className="radioArea">
                    <div className="rows">

                        <div className="rows">
                            <Form.Item className="formItem" label="Prioridad" initialValue='todo' />
                            <Radio.Group defaultValue='todo'>
                                <Radio value='todo'>Todas</Radio>
                                <Radio value='alta'>Alta</Radio>
                                <Radio value='medio'>Media</Radio>
                                <Radio value='baja'>Baja</Radio>
                            </Radio.Group>
                        </div>

                        <div className="rows">
                            <Form.Item className="formItem" label="Orden" />
                            <Radio.Group defaultValue='ASC'>
                                    <Radio value='ASC'>Ascendente</Radio>
                                    <Radio value='DESC'>Descendete</Radio>
                            </Radio.Group>
                        </div>

                        <Button type="primary" >Restablecer</Button>
                    </div>
                </div>
            </div>

            <Divider />

            <Search 
                allowClear 
                enterButton 
                placeholder="Buscar" 
                style={{width: '600px'}}
                onSearch={onSearch} 
            />

        </SearchArea>
    );
}

export default Busqueda;