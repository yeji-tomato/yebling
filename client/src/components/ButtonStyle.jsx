import styled, { css } from 'styled-components'

// font-family: 'Noto Serif KR', serif;
// font-family: 'Seaweed Script', cursive;
// font-family: 'STIX Two Text', serif;

const ButtonStyle = styled.button`
    background: #7B2A2A;
    color : #FFFFFF;
    width: 300px;
    height: 50px; 
    text-align: center;
    text-transform: uppercase;
    margin: 5px;
    border: 0;
    &:hover {
        background: #CB7474;
        color: #000;
    }
    @media only screen and (max-width: 576px) {
        width: 250px;
    }

    ${props => props.white && 
    css`
    background: #FFFFFF;
    color: #7B2A2A;
    border: 1px solid #7B2A2A;
    `}
    ${props => props.small && 
        css`
        @media only screen and (max-width: 768px) {
            width: 200px;
        }
        @media only screen and (max-width: 576px) {
            width: 100px;
        }
    `}
`;


export default ButtonStyle;