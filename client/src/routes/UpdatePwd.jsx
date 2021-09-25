import Inner from '../components/Inner';
import ButtonStyle from '../components/ButtonStyle'
import styled from 'styled-components'
import { Form, Input, message } from "antd";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updatePw } from '../_actions/user_actions';
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

function UpdatePwd(props) {

    const dispatch = useDispatch();
    const Id = props.match.params.Id
    console.log('id', Id)

    const onFinish = (values) => {

        let body = {
            id: Id,
            password: values.password
        }

        dispatch(updatePw(body))
        .then(response => {
            if(response.payload.success){
                message.success('성공적으로 비밀번호가 변경되었습니다!😆')
                  props.history.push('/login')
            }else{
                message.warning('비밀번호 변경에 실패하였습니다.');
            }
        })
    };


    return (
        <div style={bg}>
        <Inner>
        <Link to="/"><FindPW>{Id} 비밀번호 생성</FindPW></Link>
            <Form
             layout="vertical"
             onFinish={onFinish}
            >
                 <Form.Item
        name="password"
        label="PASSWORD"
        hasFeedback
        rules={[
          {
            required: true,
            message: '비밀번호를 입력해주세요!',
          },
          {
            pattern: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}/g, 
            message: '8~16자 영문 대 소문자, 숫자, 특수문자',
          }
        ]}
      >
        <Input.Password />
        </Form.Item>
           <Form.Item
            name="confirm"
            label="CONFIRM PASSWORD"
            dependencies={['password']}
            hasFeedback
            rules={[
            {
                required: true,
                message: '비밀번호 확인을 입력해주세요!',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }

                return Promise.reject(new Error('비밀번호가 일치하지 않습니다'));
                },
            }),
            ]}
        >
            <Input.Password />
        </Form.Item>
            <ButtonStyle>PASSWORD</ButtonStyle>
        </Form>
        </Inner>
    </div>
    )
}

export default withRouter(UpdatePwd)
