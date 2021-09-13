import MenuBar from "../components/MenuBar";
import Bottom from "../components/Bottom";
import Center from "../components/Center"
import { Menu, Layout, message, Card, Row, Col } from 'antd';
import styled from 'styled-components';
import ButtonStyle from '../components/ButtonStyle';
import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { goodsProduct } from '../_actions/product_actions';
import ImageSlider from "../components/ImageSlider";
import ShopCheck from '../components/ShopCheck';
import ShopRadio from '../components/ShopRadio';
import { jetype, price } from "../hoc/data";
import ShopSearch from "../components/ShopSearch";


const { Content } = Layout;
const { Meta } = Card;
const { SubMenu } = Menu;

const ShopFilter = styled(Menu)`
  width: 300px;
  @media only screen and (max-width: 992px) {
    width: 100%;
  }
`
const ShopSubMenu = styled(SubMenu)`
width: 300px;
@media only screen and (max-width: 992px) {
  width: 100%;
}
`

const ShopContent = styled.div`
    display: flex;
    @media only screen and (max-width: 992px) {
        flex-direction: column;
    }
`

export default function Shop(){

    const [Products, setProducts] = useState([])
    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState(0)
    const [Filters, setFilters] = useState({
        jewerly: [],
        price: []
    })
    const [SearchTerm, setSearchTerm] = useState('')

    const dispatch = useDispatch();
    
    useEffect(() => {
        let body = {
            skip: Skip,
            limit: setLimit(Limit)
        }
        getProducts(body)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getProducts = (body) => {

        dispatch(goodsProduct(body))
        .then(response => {
                    if(response.payload.success){
                        if(body.loadMore){
                            setProducts([...Products, ...response.payload.productInfo])
                        }else{
                            setProducts(response.payload.productInfo)
                        }
                        setPostSize(response.payload.postSize)
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
            loadMore: true,
            filters: Filters
        }

        getProducts(body)
        setSkip(skip)
    }
 
    const renderCards = Products.map((product, index) => {
        
        //console.log(product)

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

    const showFilteredResults = (filters) => {
        
        let body = {
            skip: 0,
            limit: Limit,
            filters: filters
        }
        getProducts(body)
        setSkip(0)
    }

    const handlePrice = (value) => {
        const data = price;
        let array = [];

        for(let key in data){
            if(data[key].name === value){
                array = data[key].array;
            }
        }
        return array;
    }

    const handleFilters = (filters, category) => {

        const newFilters = { ...Filters }
        newFilters[category] = filters

        console.log('Filters', Filters)
        console.log('newFilters', newFilters)

        if(category === 'price'){
            let priceValues = handlePrice(filters)
            newFilters[category] = priceValues
        }

        showFilteredResults(newFilters)
        setFilters(newFilters)
    }

    const updateSearchTerm = (newSearchTerm) => {

        let body = {
            skip: 0,
            limit: Limit,
            filters: Filters,
            searchTerm: newSearchTerm
        }

        setSkip(0)
        setSearchTerm(newSearchTerm)
        getProducts(body)
    }
 
    return (
        <>
            <MenuBar/>
            <Content style={{ padding: '30px' }}>
                <ShopSearch refreshFunction={updateSearchTerm} value={SearchTerm}/>
            <ShopContent>
                {/* Filter */}
                <ShopFilter mode="inline">
                <ShopSubMenu key="Jewerly"  title="Jewerly">
                    <ShopCheck list={jetype} handleFilters={filters => handleFilters(filters, "jetype")}/>
                </ShopSubMenu>
                <ShopSubMenu key="Price"  title="Price">
                    <ShopRadio list={price} handleFilters={filters => handleFilters(filters, "price")}/>
                </ShopSubMenu>
                </ShopFilter>

                {/* Content */}
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