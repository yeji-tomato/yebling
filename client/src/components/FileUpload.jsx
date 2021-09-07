import React, {useState} from 'react'
import Dropzone from 'react-dropzone'
import backImg from '../image/back_gr_gold.jpg'
import axios from 'axios'
import { message, Button } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
import styled from "styled-components";

function FileUpload(props) {

    const Img = {
        backgroundImage: `url(${backImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover', 
        width: '100%',
        height: '50vw',
        overflowX: 'scroll'
    }

    const [Images, setImages] = useState([])

    const dropHandler = (files) => {

        let formData = new FormData();

        const config = {
            header : {'content-type': 'multipart/form-data'}
        }
        formData.append("file", files[0])

        axios.post('/api/product/image', formData, config)
            .then(response => {
                if(response.data.success){
                    setImages([...Images, response.data.filePath]) 
                    // props.refreshFunction([...Images, response.data.filePath])
                }else{
                    message.warning('이미지 저장에 실패하였습니다.');
                    console.log(response.data)
                }
            })
    }

    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image)
        let newImages = [...Images]
        newImages.splice(currentIndex, 1)
        setImages(newImages)
        // props.refreshFunction(newImages)
        const imgName = image.slice(22);
        message.info(`${imgName}가 삭제되었습니다.`);
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


    return (
        <div style={{width: '100%', textAlign: 'center'}}>

            {/* <img src={backImg} alt="img" style={{width: '100%', height: '50vw'}} */}
            <div style={Img}>
            {Images.map((image, index) => (
                    <div key={index} style={{position: 'relative'}}>
                        <img src={`http://localhost:5000/${image}`} alt={`${index}`} 
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
