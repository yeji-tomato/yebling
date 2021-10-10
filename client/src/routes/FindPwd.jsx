import Inner from '../components/Inner';
import ButtonStyle from '../components/ButtonStyle'
import styled from 'styled-components'
import { Form, Input, message } from "antd";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { findPw } from '../_actions/user_actions';
import { withRouter } from "react-router-dom";

const bg = {
    background: '#F3E9E0',
    height: '100vh'
}

const FindPW = styled.h1`
    &:hover{
        color: #CB7474;
    }
`
const InputStyle = styled(Input)`
    width : 300px;
    padding: 10px;
    &:hover{
        color: #7B2A2A;
    }
    @media only screen and (max-width: 576px) {
        width: 250px;
    }
`

function FindPwd(props) {

    const dispatch = useDispatch();
    const onFinish = (values) => {

        dispatch(findPw(values))
        .then(response => {
            if(response.payload.success){
                props.history.push(`/pw/${values.id}`)
            }else{
                message.warning(response.payload.message);
            }
        })
    };

    return (
        <div style={bg}>
            <Inner>
            <Link to="/"><FindPW>비밀번호 찾기</FindPW></Link>
                <Form
                 layout="vertical"
                 onFinish={onFinish}
                >
                <Form.Item
                    name="id"
                    label="아이디"
                    rules={[
                    {
                        required: true,
                        message: '아이디를 입력해주세요!',
                    },
                    {
                        pattern: /^[A-za-z0-9]{4,10}/g, 
                        message: '4~10자의 영문 대 소문자, 숫자만 사용',
                      }
                    ]}
                >
                    <InputStyle />
                </Form.Item>
                <ButtonStyle>FIND PASSWORD</ButtonStyle>
            </Form>
            </Inner>
        </div>
    )
} 

export default withRouter(FindPwd);
