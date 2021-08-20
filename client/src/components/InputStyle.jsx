import styled from 'styled-components'
import { Input } from 'antd';

const InputStyle = styled(Input)`
    width : 300px;
    padding: 10px;
    background: transparent;
    border: 1px solid #000;
    &:hover{
        color: #7B2A2A;
    }
    .ant-input{
        background: transparent;
    }
`
export default InputStyle;