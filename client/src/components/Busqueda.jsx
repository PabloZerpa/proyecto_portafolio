
import { useState } from 'react';
import { Input, Checkbox } from 'antd';
import { SearchArea } from "../styles/Container.styles";

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
        <SearchArea>
            <div>
                <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
                    Todos
                </Checkbox>
                <CheckboxGroup options={opciones} value={checkedList} onChange={onChange} />
            </div>

            <Search allowClear enterButton placeholder="Search" size="large" style={{width: '600px'}} />

        </SearchArea>
    );
}

export default Busqueda;