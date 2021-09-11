import React, { useState } from 'react'
import { Form, Layout, Radio, Input, InputNumber, message } from 'antd';
import styled from 'styled-components';
import MenuBar from "../components/MenuBar";
import FileUpload from "../components/FileUpload"
import ButtonStyle from '../components/ButtonStyle';
import { withRouter } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { uploadProduct } from '../_actions/product_actions';

const { Content } = Layout;
const { TextArea } = Input;
const UploadContent = styled(Content)`
    padding: 50px; 
`   
const UploadForm = styled.div`
    padding-top: 30px;
    display: flex;
    @media only screen and (max-width: 992px) {
        flex-direction: column;
    }
`
const BtnArea = styled.div`
    text-align: center;
    width: 100%;
    margin-top: 50px; 
`
const options = [
    { label: 'NECKLACE', value: 'NECKLACE' },
    { label: 'EARRINGS', value: 'EARRINGS' },
    { label: 'RING', value: 'RING' },
    { label: 'BRACELET', value: 'BRACELET' },
  ];

function UploadPage(props) {

    const [form] = Form.useForm();
    const [Images, setImages] = useState([])

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    // console.log(Images)
    const dispatch = useDispatch();
    const onFinish = (value) => {

        if(Images.length === 0){
            message.warning('이미지를 넣어주세요😰');
        }else{
            // 서버에 채운 값들을 request로 보낸다.
            let body = {
                images: Images,
                jetype: value.type,
                title: value.title,
                price: value.price,
                count: value.count,
                material: value.material,
                size: value.size,
                stone: value.stone,
                details: value.details
            }
            // console.log('body', body)

            // axios.post('/api/product/upload', body)
            // .then(response => {
            //     if(response.data.success){
            //         message.success('상품 업로드에 성공하였습니다!😆');
            //         props.history.push('/shop')
            //     }else{
            //         message.warning('상품 업로드에 실패하였습니다.😰');
            //     }
            // })
            dispatch(uploadProduct(body))
            .then(response => {
                    if(response.payload.success){
                        message.success('상품 업로드에 성공하였습니다!😆');
                        props.history.push('/shop')
                    }else{
                        message.warning('상품 업로드에 실패하였습니다.😰');
                    }
                })
        } 
    };


    return (
        <div>
            <MenuBar/>
            <UploadContent>
            <div>
                <h1>
                    UPLOAD JEWERY
                </h1>
                <hr />
            </div>

            <Form 
             form={form}
             layout="vertical"
             onFinish={onFinish}
            >
            <UploadForm>
                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />
                <div style={{paddingLeft: '30px', width: '100%'}}>
                    <Form.Item 
                        name="jetype"
                        label="악세사리 타입" 
                        tooltip="예블링은 총 4가지의 타입으로 이루어져있습니다. 맞춰서 작성해주세요!"
                        rules={[
                            {
                                required: true,
                                message: '악세사리 타입을 골라야만합니다!',
                            }
                        ]}>
                        <Radio.Group optionType="button"
                        buttonStyle="solid" options={options} />
                    </Form.Item>
                    <Form.Item
                         name="title"
                         label="상품명"
                         rules={[
                            {
                                required: true,
                                message: '상품명을 입력해주세요!',
                            }
                         ]}
                        >
                        <Input placeholder='RA0087'/>
                    </Form.Item>
                    <Form.Item
                         name="price"
                         label="가격"
                         rules={[
                            {
                                required: true,
                                message: '가격을 입력해주세요!',
                            }
                         ]}
                        >
                        <InputNumber
                        placeholder='10,000'
                        formatter={price => `${price}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                        parser={price => price.replace(/\$\s?|(,*)/g, '')}
                        style={{width: '100%'}}
                        />
                    </Form.Item>
                    <Form.Item
                         name="count"
                         label="수량"
                         rules={[
                            {
                                required: true,
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                if (!value || getFieldValue('count') === 0) {
                                    // return Promise.resolve();
                                    return Promise.reject(new Error('최소 수량 5개부터 입력해주세요!'));
                                }else if(getFieldValue('count') === 101){
                                    return Promise.reject(new Error('입력하실 수 있는 최대 수량은 100개입니다!'));
                                }
                
                                return Promise.resolve();
                                },
                            })
                         ]}
                        >
                        <InputNumber min={0} max={100} step={5} placeholder="0" />
                    </Form.Item>
                    <h2>KEY SPECIFICATIONS</h2>
                    <Form.Item
                         name="material"
                         label="MATERIAL"
                         rules={[
                            {
                                required: true,
                                message: '상품 재질을 입력해주세요!',
                            }
                         ]}
                        >
                        <Input placeholder='14K Rose Gold'/>
                    </Form.Item>
                    <Form.Item
                         name="size"
                         label="SIZE"
                         rules={[
                            {
                                required: true,
                                message: '상품 사이즈를 입력해주세요!',
                            }
                         ]}
                        >
                        <Input placeholder='40-42cm (P9.8*12.1mm)'/>
                    </Form.Item>
                    <Form.Item
                         name="stone"
                         label="STONE"
                         rules={[
                            {
                                required: true,
                                message: '상품 stone을 입력해주세요!',
                            }
                         ]}
                        >
                        <Input placeholder='White Topaz, Pink Sapphire, Morganite'/>
                    </Form.Item>
                    <Form.Item
                     name="details"
                     label="DETAILS"
                    >
                     <TextArea 
                        placeholder="은은한 색감의 모거나이트를 감싸는 섬세한 꼬임 
                            디테일과 화사한 핑크 사파이어의 조합이 
                            매력적인 분위기를 연출하는 목걸이" 
                            autoSize={{ minRows: 3 }}
                            showCount maxLength={100} allowClear />
                    </Form.Item>
                </div>
            </UploadForm>
            <BtnArea>
                <ButtonStyle>등록하기</ButtonStyle>
                <ButtonStyle white >취소하기</ButtonStyle>
            </BtnArea>    
            </Form>
            </UploadContent>


        </div>
    )
}

export default withRouter(UploadPage)