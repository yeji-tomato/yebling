import { UserOutlined, LockOutlined  } from '@ant-design/icons';
import Button from '../components/Button'
import InputStyle from '../components/InputStyle';
import { Form, Row, Col, Divider, message } from "antd";
import Logo from '../components/Logo';
import Inner from '../components/Inner';
import { useDispatch } from 'react-redux';
import { loginUser } from '../_actions/user_actions';


export default function Login(props){

    const bg = {
        background: '#F3E9E0'
    }

    // const onSubmitHandler = (e, values) => {
    //     e.preventDefault(); // 페이지 재로딩 방지

    //     console.log(values)
    // }

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
            <Logo />
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
                <div>
                <Divider />
                    <Row justify="center">
                        <Col>회원가입</Col>
                            &nbsp;|&nbsp;
                        <Col>아이디 찾기</Col>  
                            &nbsp;|&nbsp;
                        <Col>비밀번호 찾기</Col> 
                    </Row>
                </div>
            </Form>
            {/* <form onSubmit={onSubmitHandler}>
                <InputStyle 
                prefix={<UserOutlined/>} 
                placeholder="ID"/>
                <br />
                <InputStyle 
                prefix={<LockOutlined />} 
                type="password"
                placeholder="PASSWORD" />
                <br />
                <Button>Login</Button>
                <div>
                <Divider />
                    <Row justify="center">
                        <Col>회원가입</Col>
                            &nbsp;|&nbsp;
                        <Col>아이디 찾기</Col>  
                            &nbsp;|&nbsp;
                        <Col>비밀번호 찾기</Col> 
                    </Row>
                </div>
            </form> */}
            </Inner>
        </div>
    )
}