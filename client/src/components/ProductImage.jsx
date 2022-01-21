import React, {useState , useEffect} from 'react'
import { Carousel, Image } from 'antd';

function ProductImage(props) {

    // let address = process.env.NODE_ENV === 'production' ? `https://yebling.herokuapp.com/` : `http://localhost:5000/`

    const [Images, setImages] = useState([])

    useEffect(() => {
        if(props.detail.images && props.detail.images.length > 0){
            let images = []
            props.detail.images.map(item => (
                images.push({
                    original: `https://yebling.herokuapp.com/${item}`
                })
            ))
                setImages(images)
            }
    }, [props.detail])

    console.log('Images',Images[0])

    return (
        <div style={{width: '100%', textAlign: 'center', padding: '30px'}}>
            <Carousel autoplay>
            {Images.map(({original}, index) => (
                <div key={index}>
                    <Image src={`${original}`}/>
                </div>
            ))
            }
            </Carousel>
        </div>
    )
}

export default ProductImage
