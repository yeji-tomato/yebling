import { Form, Input, DatePicker, Radio, message } from 'antd';
import Logo from '../components/Logo';
import Inner from '../components/Inner';
import { Link } from 'react-router-dom';
import ButtonStyle from '../components/ButtonStyle';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { registerUser } from '../_actions/user_actions';
import { withRouter } from "react-router-dom";

function Register(props){

    const BgDiv = styled.div`
        background: #F3E9E0;
        min-height: 100vh;
        padding: 50px;
        @media only screen and (max-width: 576px) {
            height: 170vh;
        }
    `
    const [form] = Form.useForm();

    const formItemLayout = {
        labelCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 8,
          },
        },
        wrapperCol: {
          xs: {
            span: 24,
          },
          sm: {
            span: 16,
          },
        },
      };

      const dispatch = useDispatch();

      const onFinish = (values) => {

          let body = {
              id: values.id,
              password: values.password,
              name: values.name,
              gender: values.gender,
              email: values.email,
              birth: values['birth'].format('YYYY-MM-DD'),
              phone: values.phone
          }

          console.log(body)

          dispatch(registerUser(body))
              .then(response => {
                  if(response.payload.success){
                      message.success('성공적으로 회원가입이 완료되었습니다!😆');
                      props.history.push('/login')
                  }else{
                    //   message.warning('회원가입에 실패하였습니다.😰');
                      message.warning(response.payload.message);
                  }
              })
  
      };

    return (
        <BgDiv>
            <Inner>
            <Link to="/">
            <Logo>yebling</Logo>
            </Link>
            <Form 
            style={{margin: '20px'}}
            {...formItemLayout}
            form={form}
            initialValues = {{gender: 'female'}}
            onFinish={onFinish}
            >
                <Form.Item
                    name="id"
                    label="ID"
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
                    <Input/>
                </Form.Item>
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
            label="CONFIRM PW"
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
        <Form.Item
            name="name"
            label="NAME"
            rules={[
            {
                required: true,
                message: '이름을 입력해주세요!',
            },
            {
                pattern: /^[가-힣]{2,4}$/, 
                message: '2~4자의 한글이름을 입력해주세요!',
            }
            ]}
        >
            <Input />
        </Form.Item>
        <Form.Item
            name="birth"
            label="BIRTH"
            rules={[
            {
                required: true,
                message: '생년월일을 입력해주세요!',
            },
            ({ getFieldValue }) => ({
                validator(_, value) {
                if (!value || getFieldValue('birth') < new Date()) {
                    return Promise.resolve();
                }
    
                return Promise.reject(new Error('생년월일을 정확히 입력하세요!'));
                },
            }),
            ]}
        >
            <DatePicker />
        </Form.Item>
        <Form.Item
            name="gender"
            label="GENDER"
        >
            <Radio.Group 
            buttonStyle="solid">
                <Radio.Button value="male">MALE</Radio.Button>
                <Radio.Button value="female">FEMALE</Radio.Button>
            </Radio.Group>
        </Form.Item>
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
            <Input />
        </Form.Item>
        <Form.Item
        name="phone"
        label="PHONE"
        rules={[
          {
            required: true,
            message: '핸드폰 번호를 입력해주세요!',
          },
          {
            pattern: /^[0-9]+$/, 
            message: '올바른 휴대전화 번호를 입력해주세요!',
        }
        ]}
      >
        <Input
          addonBefore='+82'
          style={{
            width: '100%',
          }}
        />
      </Form.Item>
      <ButtonStyle style={{width: '100%' }}>Register</ButtonStyle>
    </Form>
    </Inner>
    </BgDiv> 
    )
}

export default withRouter(Register)