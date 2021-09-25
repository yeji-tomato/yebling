import React, {useEffect, useState} from 'react'
import { useDispatch } from 'react-redux';
import MenuBar from '../components/MenuBar'
import ProductImage from '../components/ProductImage'
import ProductInfo from '../components/ProductInfo'
import Bottom from '../components/Bottom'
import { message, Row, Col } from 'antd'
import { withRouter } from "react-router-dom";
import { getDetailItem } from '../_actions/user_actions';

function ProductDetail(props) {

    const dispatch = useDispatch();
    const productId = props.match.params.productId
    const [Product, setProduct] = useState({})


    useEffect(() => {
        dispatch(getDetailItem(productId))
        // axios.get(`/api/users/products_by_id?id=${productId}&type=single`)
        .then(response => {
            setProduct(response.payload[0])
        })
        .catch(err => message.warning('상세정보 가져오기를 실패하였습니다😰'))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <MenuBar/>
            <Row gutter={[16, 16]} style={{paddingTop: '30px'}} >
                <Col lg={12} sm={24}>
                    {/* ProductImage */}
                    <ProductImage detail={Product} />
                </Col>
                <Col lg={12} sm={24}>
                    {/* ProductInfo */}
                    <ProductInfo detail={Product} />
                </Col>
            </Row>
            <Bottom />
        </div>
    )
}

export default withRouter(ProductDetail);
