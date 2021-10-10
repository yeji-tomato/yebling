import styled, { css } from 'styled-components'
import { Layout } from 'antd';

const { Content } = Layout;
const Center = styled(Content)`
    ${props => props.home && 
        css`
        width: 100%;
        height: 100%;
        display : flex;
        justify-content: center;
        flex-wrap : wrap;
        position: relative;
        align-items: center;
        @media only screen and (max-width: 576px) {
            flex-direction: column;
        }
    `}    
    `

export default Center;