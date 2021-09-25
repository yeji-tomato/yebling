import Inner from '../components/Inner';
import ButtonStyle from '../components/ButtonStyle'
import styled from 'styled-components'
import { Form, Input, message, Modal } from "antd";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { findId } from '../_actions/user_actions';
import { withRouter } from "react-router-dom";

const bg = {
    background: '#F3E9E0',
    height: '100vh'
}

const FindID = styled.h1`
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

const Pass = styled.span`
color: #000;
    &:hover{
        color: #CB7474;
    }
`

function FindId(props) {

    const dispatch = useDispatch();
    const onFinish = (values) => {

        dispatch(findId(values))
        .then(response => {
            if(response.payload.success){
                Modal.info({
                    content: `아이디는 ${response.payload.id} 입니다!`,
                  });
            }else{
                message.warning(response.payload.message);
                props.history.push('/register')
            }
        })
    };

    return (
        <div style={bg}>
            <Inner>
            <Link to="/"><FindID>아이디 찾기</FindID></Link>
                <Form
                 layout="vertical"
                 onFinish={onFinish}
                >
                <Form.Item
                    name="email"
                    label="E-MAIL"
                    rules={[
                    {
                        type: 'email',
                        message: '올바른 이메일 양식이 아닙니다!',
                    },
                    {
                        required: true,
                        message: '이메일을 입력해주세요!',
                    },
                    ]}
                >
                    <InputStyle />
                </Form.Item>
                <ButtonStyle>FIND ID</ButtonStyle>
            </Form>
            <Link to="/pw">
                <Pass>비밀번호 찾기</Pass>
            </Link>
            </Inner>
        </div>
    )
}

export default withRouter(FindId);
