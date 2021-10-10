import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import backImg from '../image/back_gr_gold.jpg'
import { message, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { imageProduct } from '../_actions/product_actions';

const Img = {
    backgroundImage: `url(${backImg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover', 
    width: '100%',
    height: '50vw',
    overflowX: 'scroll'
}
const Delete =  styled(DeleteOutlined)`
    position: absolute;
    top: 2vw;
    right: 2vw;
    z-index: 1;
    font-size: 3vh;
    padding: 1vw;
    &:hover{
        background: #7B2A2A;
        color: #fff;
}
`

function FileUpload({refreshFunction}) {

    const [Image, setImage] = useState([])
    const dispatch = useDispatch();

    const dropHandler = (files) => {

        let formData = new FormData();

        const config = {
            header : {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        dispatch(imageProduct(formData, config))
        .then(response => {
                if(response.payload.success){
                    setImage([...Image, response.payload.filePath])
                    refreshFunction([...Image, response.payload.filePath])
                }else{
                    message.warning('이미지 저장에 실패하였습니다.');
                }
            })

    }

    const deleteHandler = (image) => {
        const currentIndex = Image.indexOf(image)
        let newImage = [...Image]
        newImage.splice(currentIndex, 1)
        setImage(newImage)
        refreshFunction(newImage)

        const imgName = image.slice(22);
        message.info(`${imgName}가 삭제되었습니다.`);
    }

    let src = process.env.NODE_ENV === 'production' ? `https://yebling.herokuapp.com/` : `http://localhost:5000/`


    return (
        <div style={{width: '100%', textAlign: 'center'}}>
            <div style={Img}>
            {Image.map((image, index) => (
                    <div key={index} style={{position: 'relative'}}>
                        <img src={`${src}${image}`} alt={`${index}`} 
                        style={{width: '100%', height: '50vw'}}/>
                        <Delete onClick={() => deleteHandler(image)}/>
                    </div>
                ))}
            </div>

                <Dropzone onDrop={dropHandler}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Button style={{marginTop: '30px', background: '#B29090', color: '#fff', borderRadius: '10px'}}>CHOOSE IMAGE</Button>
                    </div>
                    </section>
                )}
            </Dropzone>

        </div>
    )
}

export default FileUpload
