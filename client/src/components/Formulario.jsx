
import { FormContainer } from "../styles/Container.styles";
import { Input, Select, Form, DatePicker } from "antd";
const { TextArea } = Input;

function Formulario({ label, name, tipo, opciones, datos }) {

    // return(
    //     <FormContainer>
    //         <Form.Item className="formItem" label={label} name={name} >
    //             {tipo === 'input' ? ( <Input allowClear className="input" placeholder={label} defaultValue={datos} /> ) : ( null )}
    //             {tipo === 'area' ? ( <TextArea allowClear className="input" rows={3} placeholder={label} defaultValue={datos} /> ) : ( null )}
    //             {tipo === 'date' ? ( <DatePicker className="input" /> ) : ( null )}
    //             {tipo === 'select' ? (  <Select style={{ width: 200,}} placeholder={label} defaultValue={datos} options={opciones} className="select" /> ) : ( null )}
    //         </Form.Item>
    //     </FormContainer>
    // );

    if(tipo === 'input'){
        return(
            <FormContainer>
                <Form.Item className="formItem" label={label} name={name}>
                    <Input allowClear className="input" placeholder={label} defaultValue={datos} /> 
                </Form.Item>
            </FormContainer>
        );
    }
    else if(tipo === 'area'){
        return(
            <FormContainer>
                <Form.Item className="formItem" label={label} name={name} >
                    <TextArea allowClear className="input" rows={3} placeholder={label} defaultValue={datos} /> 
                </Form.Item>
            </FormContainer>
        );
    }
    else if(tipo === 'date'){
        return(
            <FormContainer>
                <Form.Item className="formItem" label={label} name={name} >
                    <DatePicker className="input" />
                </Form.Item>
            </FormContainer>
        );
    }
    else if(tipo === 'select'){
        return(
            <FormContainer>
                <Form.Item className="formItem" label={label} name={name} >
                    <Select
                        value={datos} 
                        style={{ width: 200,}}
                        placeholder={label}
                        options={opciones}
                        className="select"
                    /> 
                </Form.Item>
            </FormContainer>
        );
    }
}

export default Formulario;