import { UserOutlined, ShoppingCartOutlined, UploadOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { message, Badge } from 'antd';
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logoutUser } from '../_actions/user_actions';
import styled from 'styled-components';
import { useEffect } from "react";

const activeStyle = { 
    color: "#7B2A2A",
    fontWeight: 'bold',
 };

 const Logout = styled.li`
    cursor: pointer;
    &:hover{
        color: #CB7474;
    }
 `

function AuthMenu(props){

    const [login, setLogin] = useState(false);
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const [CartCount, setCartCount] = useState(0)

    useEffect(() => { 
        if(user.userData && user.userData.cart){
            setCartCount(user.userData.cart.length)
        }
    }, [user.userData])

    const onClickHandler = () => {

        dispatch(logoutUser())
        .then(response => {
            if(response.payload.success){
                setLogin(!login);
                message.success('성공적으로 로그아웃이 완료되었습니다!');
                props.history.push('/')
            }else{
                message.warning('로그아웃에 실패하였습니다.');
            }
        })
    }

        if(user.userData && !user.userData.isAuth){
            return(
            <ul>   
                <li></li>
                <li>
                    <NavLink to="/login" activeStyle={activeStyle}>Login</NavLink>
                </li>
                <li>
                    <NavLink to="/register" activeStyle={activeStyle}>Register</NavLink>
                </li>
            </ul>
           )
        }else{
            if(user.userData && user.userData.isAdmin){
                return (
                <ul>   
                    <li>
                        <NavLink to="/mypage" activeStyle={activeStyle}>
                        <UserOutlined style={{ fontSize: '18px'}}/>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/upload" activeStyle={activeStyle}>
                        <UploadOutlined style={{ fontSize: '18px'}}/>
                        </NavLink>
                    </li>
                    <li onClick={onClickHandler} >Logout</li>
                </ul>

                )
            }else{
                return(
                    <ul>   
                        <li>
                            <NavLink to="/mypage" activeStyle={activeStyle}>
                            <UserOutlined style={{ fontSize: '18px'}}/>
                            </NavLink>
                        </li>
                        <li>
                        <Badge count={CartCount} size="small" style={{ backgroundColor: '#7B2A2A' }}>
                            <NavLink to="/cart" activeStyle={activeStyle}>
                            <ShoppingCartOutlined style={{ fontSize: '18px'}}/>    
                            </NavLink>
                        </Badge> 
                        </li>
                        <Logout onClick={onClickHandler} >
                            Logout
                        </Logout>
                </ul>
                )
            }
        }
}

export default withRouter(AuthMenu);