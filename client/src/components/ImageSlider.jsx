import React from 'react'
import { Carousel } from 'antd'

function ImageSlider(props) {

    return (
        <div>
            <Carousel autoplay>
                    {props.images.map((image, index) => (
                        <div key={index}>
                            <img style={{width: '100%', maxHeight:'300px'}} 
                            src={`http://localhost:5000/${image}`} alt={`${index}`} />
                        </div>
                    ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider
