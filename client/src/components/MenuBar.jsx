import styled from 'styled-components'
import { Layout } from 'antd';
import Logo from './Logo';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import { useState } from "react";
import AuthMenu from './AuthMenu';

function MenuBar(){


    const { Header } = Layout;
    const Nav = styled(Header)`
        height: 90px;
        line-height: 90px;
        display : flex;
        justify-content: space-between;
        flex-wrap : wrap;
        background: #F3E9E0;
        padding: 0 25px;
        opacity: .99;
        z-index: 9;
        ul{
            list-style:none;
            display: flex;
            flex-wrap : wrap;
            padding: 0;
        }
        li{
            padding: 0 15px;
            font-size: 14px;
        }
        a{
            color: #000;
            &:hover{
                color: #CB7474;
                font-weight: bold;
            }
        }

        @media only screen and (max-width: 576px) {
            height: 60px;
            display : block;
            padding: 0;
            line-height: 60px;
            border-bottom: 1px solid #9A9A9A;
            ul{
                flex-direction: column;
                align-items: flex-start;
                background: #F3E9E0;
                opacity: 0;
            }
            li{
                width: 100%;
                text-align: center;
                &:hover{
                    background: #CA9E9E;
                    a{
                        color: #fff;
                    }
                }
            }
            .active ul{
                opacity: 1;
            }
        }
    `

    const Left = styled.div`
    @media only screen and (max-width: 576px) {
        padding-top: 60px;
        ul{
            margin: 0;
        }
    }
    `

    const Right = styled.div`
    @media only screen and (max-width: 576px) {
        
    }
    `

    const activeStyle = { 
        color: "#7B2A2A",
        fontWeight: 'bold'
     };

     const Icon = styled.div`
        display: none;
        @media only screen and (max-width: 576px) {
            position: absolute;
            display: block;
            text-align: right;
            font-size: 20px;
            top: 0;
            right: 0;
            padding-right: 20px;
        }
     `

     const [click, setClick] = useState(false);

     const handleClick = () => setClick(!click);


    return(
        <Nav>
            <Left className={click ? "active" : "nav-menu"}>
                <ul>
                    <li>
                        <NavLink to="/" exact activeStyle={activeStyle} >Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/Shop" activeStyle={activeStyle}>Shop</NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" activeStyle={activeStyle}>About</NavLink>
                    </li>
                </ul>
            </Left>
            <NavLink to="/">
            <Logo center>yebling</Logo>
            </NavLink>
            <Right className={click ? "active" : "nav-menu"}>
                <AuthMenu/>
            </Right>  
            <Icon onClick={handleClick}>
                { click ?  <CloseOutlined /> : <MenuOutlined />}
            </Icon>
        </Nav>
    )
}

export default MenuBar;