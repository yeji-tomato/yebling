import styled, { css } from 'styled-components'

const Logo = styled.div`
    text-align: center;
    font-family: 'Seaweed Script', cursive;
    font-size: 45px;
    line-height: 90px;
    color: #484644;
    &:hover{
            color: #CB7474;
    }

    ${props => props.center &&
    css`
    @media only screen and (max-width: 576px) {
        // display: none;
        text-align: left;
        line-height: 60px;
        font-size: 30px;
        position: absolute;
        padding-left: 20px;
        top: 0;
    }
    ` }
`

export default Logo;