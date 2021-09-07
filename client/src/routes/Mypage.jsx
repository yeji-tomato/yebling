import MenuBar from "../components/MenuBar";
import Bottom from "../components/Bottom";
import Inner from '../components/Inner';
import { Form, Input, DatePicker, Radio } from 'antd';
import ButtonStyle from '../components/ButtonStyle';
import { withRouter } from "react-router-dom";

function Mypage() {

    
    return (
        <div>
            <MenuBar/>
            <Inner>
            <Form 
            style={{margin: '50px', height: '65vh'}}
            // {...formItemLayout}
            // form={form}
            initialValues = {{gender: 'female'}}
            // onFinish={onFinish}
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
      <ButtonStyle style={{width: '100%' }}>수정하기</ButtonStyle>
    </Form>
            </Inner>
            <Bottom />
        </div>
    )
}

export default withRouter(Mypage);