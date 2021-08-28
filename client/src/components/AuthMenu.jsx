import { UserOutlined, ShoppingCartOutlined, UploadOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import axios from 'axios';
import { message } from 'antd';
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { withRouter } from "react-router-dom";

function AuthMenu(props){
    const activeStyle = { 
        color: "#7B2A2A",
        fontWeight: 'bold'
     };

    // const [click, setClick] = useState(false);

    // const handleClick = () => setClick(!click);
    // console.log(handleClick)

    const [login, setLogin] = useState(false);

    const onClickHandler = () => {
       axios.get(`/api/users/logout`)
       .then(response => {
           if(response.data.success){
               setLogin(!login);
               message.success('성공적으로 로그아웃이 완료되었습니다!');
               props.history.push('/')
           }else{
               message.warning('로그아웃에 실패하였습니다.');
           }
       })
    }

    const user = useSelector(state => state.user)

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
                            <NavLink to="/cart" activeStyle={activeStyle}>
                            <ShoppingCartOutlined style={{ fontSize: '18px'}}/>
                            </NavLink>
                        </li>
                        <li onClick={onClickHandler} >Logout</li>
                </ul>
                )
            }
        }
}

export default withRouter(AuthMenu);