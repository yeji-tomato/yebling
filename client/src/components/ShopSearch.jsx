import { Input } from 'antd';

const { Search } = Input;

function ShopSearch(props) {

    const onSearch = (value) => {
        props.refreshFunction(value);
    }

    return (
        <div style={{ margin: '16px 0', textAlign: 'end' }}>
            <Search 
            placeholder="Search" 
            onSearch={onSearch} 
            style={{ width: 200 }}  
            enterButton allowClear />
        </div>
    )
}

export default ShopSearch
