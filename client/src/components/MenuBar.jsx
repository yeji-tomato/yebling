import { useState } from "react";
import styled from 'styled-components'
import { NavLink } from "react-router-dom";
import { Layout } from 'antd';
import Logo from './Logo';

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
            // background: green;
            border-bottom: 1px solid #9A9A9A;
            ul{
                flex-direction: column;
                align-items: flex-start;
                background: #F3E9E0;
                opacity: 0;
                &.active{
                    opacity: 1;
                }
            }
            li{
                width: 100%;
                text-align: center;
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

    const Right = styled.div``

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
            <Left>
                <ul className={click ? "active" : "nav-menu"}>
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
            <Right>
                <ul className={click ? "active" : "nav-menu"}>   
                    <li></li>
                    <li>
                        <NavLink to="/login" activeStyle={activeStyle}>Login</NavLink>
                    </li>
                    <li>
                        <NavLink to="/register" activeStyle={activeStyle}>Register</NavLink>
                    </li>
                </ul>
            </Right>
            <Icon onClick={handleClick}>
                <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
            </Icon>
        </Nav>
    )
}

export default MenuBar;