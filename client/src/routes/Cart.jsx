import React, {useState} from 'react'
import MenuBar from "../components/MenuBar";
import Bottom from "../components/Bottom";
import CartTable from '../components/CartTable'
import Payment from '../components/Payment';
import ButtonStyle from '../components/ButtonStyle';
import styled from 'styled-components';
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { getCartItems, removeCartItem, onSuccessBuy } from '../_actions/user_actions';
import { withRouter } from "react-router-dom";
import { useSelector } from "react-redux";
import { GiftOutlined, CreditCardOutlined } from '@ant-design/icons';
import { Result } from 'antd';

const CartArea = styled.div`
    padding: 50px;
    min-height: 80vh;
`

const TotalArea = styled.div`
    padding: 30px;
    text-align: right;
`
const PayBtn = styled.div`
    display: flex;
    justify-content: center;
`

function Cart(props) {

    
    const dispatch = useDispatch();
    const user = useSelector(state => state.user)
    const [Total, setTotal] = useState(0)
    const [Title, setTitle] = useState('')
    const [ShowTotal, setShowTotal] = useState(false)
    const [ShowSuccess, setShowSuccess] = useState(false)


    useEffect(() => {

        let cartItems = []
        //리덕스 User state안에 cart 안에 상품이 들어있는지 확인 
        if (user.userData && user.userData.cart) {
            if (user.userData.cart.length > 0) {
                user.userData.cart.forEach(item => {
                    cartItems.push(item.id)
                })
                dispatch(getCartItems(cartItems, user.userData.cart))
                    .then(response => { calculateTotal(response.payload) })
            }
        }
    }, [dispatch, user.userData])

    let calculateTotal = (cartDetail) => {
        let total = 0;
        let title = '';
        const len = cartDetail.length;
        // eslint-disable-next-line array-callback-return
        cartDetail.map(item => {
            total += (item.price) * item.quantity
            if(len > 1){
                title = item.title + ' 외 ' + (len-1)
            }else{
                title = item.title
            }
        })
        setTotal(total)
        setTitle(title)
        setShowTotal(true)
    }

    let removeFromCart = (productId) => {
        dispatch(removeCartItem(productId))
        .then(response => {

            if (response.payload.productInfo.length <= 0) {
                setShowTotal(false)
            }

        })
    }

    const CommaTotal = String(Total).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    let PaymentInfo = {}
    if(user.userData){
        PaymentInfo = {
            amount:  Total,
            title: Title,
            name: user.userData.name,
            tel: user.userData.phone,
            email: user.userData.email
        }
    }

    const onClickHandler = () => {
        props.history.push('/shop')
    }

    const transactionSuccess = () => {
        dispatch(onSuccessBuy({
            cartDetail: user.cartDetail
        }))
            .then(response => {
                if (response.payload.success) {
                    setShowTotal(false)
                    setShowSuccess(true)
                }
            })
    }
    
    return (
        <div>
            <MenuBar/>
            <CartArea>
                <h1>CART</h1>
                <CartTable  products={user.cartDetail} removeItem={removeFromCart}/>
                {ShowTotal ? 
                <>
                    <TotalArea>
                        <h2>TOTAL</h2>
                        <h2 style={{color: '#7B2A2A'}}>₩ {CommaTotal}</h2>
                    </TotalArea>
                    <PayBtn>
                        <Payment detail={PaymentInfo} onSuccess={transactionSuccess}>BUY</Payment>
                        <ButtonStyle white onClick={onClickHandler}>Back To Shopping</ButtonStyle>
                    </PayBtn>
                </>
                : ShowSuccess ?
                <Result
                    icon={<CreditCardOutlined />}
                    title="성공적으로 구매되었습니다!"
                />
                :
                <Result
                    icon={<GiftOutlined />}
                    title="상품이 존재하지 않습니다."
                />
                            
                }
            </CartArea>
            <Bottom />
        </div>
    )
}

export default withRouter(Cart);