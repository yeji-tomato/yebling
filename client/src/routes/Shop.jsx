import MenuBar from "../components/MenuBar";
import Bottom from "../components/Bottom";
// import LeftSider from "../components/LeftSider";
import Center from "../components/Center"
import { Layout, Input, message, Card, Row, Col } from 'antd';
import styled from 'styled-components';
import ShopMenu from "../components/ShopMenu";
import ButtonStyle from '../components/ButtonStyle';
import { useState, useEffect } from "react";
import axios from "axios";
import ImageSlider from "../components/ImageSlider";

const { Content } = Layout;
const { Search } = Input;
const { Meta } = Card;

const ShopContent = styled.div`
    display: flex;
    @media only screen and (max-width: 992px) {
        flex-direction: column;
    }
`

export default function Shop(){

    const onSearch = value => console.log(value);

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)


    useEffect(() => {

        let body = {
            skip: Skip,
            limit: Limit
        }

        getProducts(body)

    }, [])

    const getProducts = (body) => {
        axios.post('/api/product/products', body)
            .then(response => {
                if(response.data.success){
                    if(body.loadMore){
                        setProducts([...Products, ...response.data.productInfo])
                    }else{
                        setProducts(response.data.productInfo)
                    }
                    setPostSize(response.data.postSize)
                }else{
                    message.warning('상품들을 가져오는데 실패하였습니다😰');
                }
         })
    } 

    const loadMoreHandler = () => {

        let skip = Skip + Limit;

        let body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }

        getProducts(body)
        setSkip(skip)
    }
 
    const renderCards = Products.map((product, index) => {
        
        console.log(product)

        const CommaPrice = (price) => {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        }

        return  <Col lg={6} md={8} xs={24}          
        key={index}>
        <Card
            style={{ width: 240 , height: 350 }}
            hoverable
            cover={<ImageSlider images={product.images} />}
        >
            <Meta title={product.title} description={`₩ ${CommaPrice(product.price)}`} />
        </Card>
        </Col>
    })


    
    return (
        <>
            <MenuBar/>
            <Content style={{ padding: '30px' }}>
            <div style={{ margin: '16px 0', textAlign: 'end' }}>
                <Search placeholder="Search" allowClear onSearch={onSearch} style={{ width: 200 }} />
            </div>
            <ShopContent>
                <ShopMenu/>
                <Center style={{ padding: '20px'}}>
                    <Row gutter={[16, 16]}>
                        {/* Cards */}
                        {renderCards}
                    </Row>

                    {PostSize >= Limit &&
                        <div style={{ textAlign: 'center', marginTop: '30px'}}>
                            <ButtonStyle onClick={loadMoreHandler}>더보기</ButtonStyle>
                        </div>
                    }
                </Center>
            </ShopContent>
            </Content>
            <Bottom />
        </>
    )
}