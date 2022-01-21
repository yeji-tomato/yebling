import React from 'react'
import { Carousel } from 'antd'

function ImageSlider(props) {

    // let src = process.env.NODE_ENV === 'production' ? `https://yebling.herokuapp.com/` : `http://localhost:5000/`
    return (
        <div>
            <Carousel autoplay>
                    {props.images.map((image, index) => (
                        <div key={index}>
                            <img style={{width: '100%', maxHeight:'300px'}} 
                            src={`https://yebling.herokuapp.com/${image}`} alt={`${index}`} />
                        </div>
                    ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider
