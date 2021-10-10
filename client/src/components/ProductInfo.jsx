import React, {useState} from 'react'
import ButtonStyle from './ButtonStyle';
// import Payment from './Payment';
import styled from 'styled-components';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import {message, Divider} from 'antd'
// import { useSelector } from "react-redux";
import { withRouter } from 'react-router-dom';
import PayCart from '../components/PayCart'

const FlexContent = styled.div`
display: flex;
@media only screen and (max-width: 992px) {
    justify-content: center;
}
`
const QuBtn = styled(ButtonStyle)`
    background: #B29090;
    width: 50px;
    &:hover {
        background: #FFFFFF;
        color: #B29090;
        border: 1px solid #B29090;
    }
`

const QuNumber = styled.div`
    width: 100px;
    text-align: center;
    line-height: 50px;
    height: 50px;
`

function ProductInfo(props) {

    const Product = props.detail;
    // const User = useSelector(state => state.user)

    const [number, setNumber] = useState(1);

    const price =  String(Product.price).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    const increaseNumber = () => { // number의 값을 증가시키는 함수
    if(number === Product.count){
        message.info(`${Product.title}의 최대 재고수량은 ${Product.count}입니다.`);
        setNumber(Product.count);
    }else{
        setNumber(number + 1);
    }
    // setNumber(prevNumber => prevNumber + 1);
    // 다음과 같이 현재 number의 값을 불러와서 증가 시켜주는 방법도 있습니다 :)
    };

    const decreaseNumber = () => { // number의 값을 감소시키는 함수
        if(number === 1){
            message.info('1은 최소수량입니다.');
            setNumber(1);   
        }else{
            setNumber(number - 1);
        }
        
        // setNumber(prevNumber => prevNumber - 1);
        // 다음과 같이 현재 number의 값을 불러와서 감소 시켜주는 방법도 있습니다 :)
      };

    const priceTot =(Product.price) * number
    const total = String(priceTot).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    const PayCartInfo = {
        amount: priceTot,
        title: Product.title,
        _id: Product._id
    }

    return (
        <div style={{padding: '30px', width: '100%'}}>
        <h1>{Product.title}</h1>
        <h2 style={{color: '#7B2A2A'}}>₩{price}</h2>
        <Divider/>
        <h3>KEY SPECIFICATIONS</h3>
       <div style={{display: 'flex'}}>
           <div style={{width: '100%', color: '#4D4D4D'}}>
               <p>MATERIAL</p>
               <p>SIZE</p>
               <p>STONE</p>
           </div>
           <div style={{width: '100%'}}>
               <p>{Product.material}</p>
               <p>{Product.size}</p>
               <p>{Product.stone}</p>
           </div>
       </div>
       <Divider/>
       <h3>DETAILS</h3>
       <p>{Product.details}</p>
       <Divider/>
       <FlexContent>
           <div style={{width: '100%'}}>
               <h3>QUANTITY</h3>
           </div>
           <div style={{width: '100%', display: 'flex'}} >
               <QuBtn onClick={increaseNumber}><PlusOutlined/></QuBtn>
                   <QuNumber>{number}</QuNumber>
               <QuBtn onClick={decreaseNumber} ><MinusOutlined /></QuBtn>
           </div>
       </FlexContent>
       <Divider/>
       <FlexContent>
           <div style={{width: '100%'}}>
               <h3>TOTAL</h3>
           </div>
           <div style={{width: '100%'}}>
               <h3 style={{color: '#7B2A2A', fontSize: '20px'}}>
                   ₩{total}
               </h3>
           </div>
       </FlexContent>
       <Divider/>
       <PayCart details={PayCartInfo}/>
       </div>
    )
}

export default withRouter(ProductInfo);
