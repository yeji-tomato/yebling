import { Layout } from 'antd';
import styled from 'styled-components';

function Bottom(){
    const { Footer } = Layout;

    const Bottom = styled(Footer)`
        background: #F3E9E0;
        text-align: center;
        font-family: 'STIX Two Text', serif;
        font-style: italic;
        font-weight: bold;
        a{
            color: #000;
            &:hover{
                color: #7B2A2A;
                font-weight: bold;
            }
        }
    `

    return(
        <div>
            <Bottom>
            <a
                href="https://github.com/Lee-ye-ji"
                target="_black">
                (c) { new Date().getFullYear() } YEJI
            </a>
            </Bottom>
        </div>
    )
}

export default Bottom;