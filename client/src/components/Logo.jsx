import styled from 'styled-components'
import { Link } from 'react-router-dom';

function Logo(){
    const LogoStyle = styled.span`
        font-family: 'Seaweed Script', cursive;
        font-size: 45px;
        line-height: 90px;
        color: #484644;
    `
    return (
        <Link to="/">
            <LogoStyle>yebling</LogoStyle>
        </Link>
    )
}

export default Logo;