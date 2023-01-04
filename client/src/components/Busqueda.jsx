
import { useState } from 'react';
import { Input, Checkbox } from 'antd';
import styled from "styled-components";

const { Search } = Input;
const CheckboxGroup = Checkbox.Group;
const opciones = ['Nombre', 'ID', 'Acronimo'];
const defaultChecked = ['Nombre'];

function Busqueda() {
    const [checkedList, setCheckedList] = useState(defaultChecked);
    const [indeterminate, setIndeterminate] = useState(true);
    const [checkAll, setCheckAll] = useState(false);
    
    const onChange = (list) => {
        setCheckedList(list);
        setIndeterminate(!!list.length && list.length < opciones.length);
        setCheckAll(list.length === opciones.length);
    };
    const onCheckAllChange = (e) => {
        setCheckedList(e.target.checked ? opciones : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    return (
        <Container>
            <div>
                <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                    Todos
                </Checkbox>
                <CheckboxGroup options={opciones} value={checkedList} onChange={onChange} />
            </div>

            <Search allowClear enterButton placeholder="Search" size="large" style={{width: '600px'}} />

        </Container>
    );
}

export default Busqueda;

const Container = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 16px;
`;