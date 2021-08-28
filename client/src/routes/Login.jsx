import { UserOutlined, LockOutlined  } from '@ant-design/icons';
import Button from '../components/Button'
import { Form, Row, Col, Divider, message, Input } from "antd";
import Logo from '../components/Logo';
import Inner from '../components/Inner';
import { useDispatch } from 'react-redux';
import { loginUser } from '../_actions/user_actions';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { withRouter } from "react-router-dom";

function Login(props){

    const bg = {
        background: '#F3E9E0',
        height: '100%'
    }

    const InputStyle = styled(Input)`
        width : 300px;
        padding: 10px;
        // background: transparent;
        // border: 1px solid #000;
        &:hover{
            color: #7B2A2A;
        }
        .ant-input{
            // background: transparent;
        }
        @media only screen and (max-width: 576px) {
            width: 250px;
        }
    `

    const RowStyle = styled(Row)`
        a{
            color: #000;
            &:hover{
                color: #7B2A2A;
            }
        }
        
    `

    const dispatch = useDispatch();


    const onFinish = (values) => {
        // console.log('Received values of form: ', values);

        dispatch(loginUser(values))
            .then(response => {
                if(response.payload.loginSuccess){
                    message.success('성공적으로 로그인이 완료되었습니다!');
                    props.history.push('/')
                }else{
                    message.warning(response.payload.message);
                }
            })

    };

    return (
        <div style={bg}>
            <Inner>
            <Link to="/">
            <Logo>yebling</Logo>
            </Link>
            <Form
                onFinish={onFinish}
                >
                 <Form.Item
                    name="id"
                    rules={[
                    {
                        required: true,
                        message: '아이디를 입력해주세요!',
                    },
                    ]}
                >
                    <InputStyle 
                    prefix={<UserOutlined/>} 
                    placeholder="ID"/>
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: '비밀번호를 입력해주세요!',
                    },
                    ]}
                >
                    <InputStyle 
                    prefix={<LockOutlined />} 
                    type="password"
                    placeholder="PASSWORD" />
                </Form.Item>
                <Button>Login</Button>
            </Form>
            <div>
                <Divider />
                    <RowStyle justify="center">
                        <Col>
                            <Link to="/register">회원가입</Link>
                        </Col>
                            &nbsp;|&nbsp;
                        <Col>
                            <Link to="/id">아이디 찾기</Link>
                        </Col>  
                            &nbsp;|&nbsp;
                        <Col>
                            <Link to="/pw">비밀번호 찾기</Link>
                        </Col> 
                    </RowStyle>
            </div>
            </Inner>
        </div>
    )
}

export default withRouter(Login);