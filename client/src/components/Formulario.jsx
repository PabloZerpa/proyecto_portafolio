
import { FormContainer } from "../styles/Container.styles";
import { Input, Select, Form, DatePicker, Button } from "antd";
const { TextArea } = Input;

function Formulario({ label, name, tipo, opciones }) {

    return(
        <FormContainer>
            <Form.Item className="formItem" label={label} name={name} >
                {tipo === 'input' ? ( <Input allowClear className="input" placeholder={label} /> ) : ( null )}
                {tipo === 'area' ? ( <TextArea allowClear className="input" rows={3} placeholder={label} /> ) : ( null )}
                {tipo === 'date' ? ( <DatePicker className="input" /> ) : ( null )}
                {tipo === 'select' ? ( 
                    <Select
                        style={{ width: 200,}}
                        placeholder={label}
                        options={opciones}
                        className="select"
                    /> 
                ) : ( null )}

            </Form.Item>
        </FormContainer>
    );

}

export default Formulario;