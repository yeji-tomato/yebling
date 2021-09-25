import React from 'react'
import ButtonStyle from './ButtonStyle';
import Payment from './Payment';
import { useDispatch, useSelector } from "react-redux";
import styled from 'styled-components';
import { message } from 'antd'
import { withRouter } from 'react-router-dom';
import { addToCart } from '../_actions/user_actions'
import { onSuccessBuy } from '../_actions/user_actions';
const BtnArea = styled.div`
    display: flex;
    text-align: center;
    width: 100%;
    margin-top: 50px; 
    justify-content: center;
`

function PayCart(props) {

    const User = useSelector(state => state.user)
    const Info = props.details
    const dispatch = useDispatch();

    const onClickHandler = () => {
        message.warning('로그인 후 이용가능합니다!');
        props.history.push('/login')
    }

    const adminHandler = () => {
        message.warning('관리자는 상품을 구매할 수 없습니다!');
    }

    const cartHandler = () => {
        // 필요한 정보를 Cart 필드에다가 넣어준다.
        dispatch(addToCart(Info._id))
        message.success('장바구니에 상품이 정상적으로 담겼습니다.')
        props.history.push('/cart');
    }

    let PaymentInfo = {}
    if(User.userData){
        PaymentInfo = {
            amount:  Info.amount,
            title: Info.title,
            name: User.userData.name,
            tel: User.userData.phone,
            email: User.userData.email
        }
    }

    
    const transactionSuccess = () => {
        dispatch(onSuccessBuy({
            cartDetail: User.cartDetail
        }))
            .then(response => {
                if (response.payload.success) {
                    props.history.push('/mypage')
                }
            })
    }

    if(User.userData && !User.userData.isAuth){
        return(
        <BtnArea>
            <ButtonStyle onClick={onClickHandler}>BUY</ButtonStyle>
            <ButtonStyle white onClick={onClickHandler}>WISH LIST</ButtonStyle>
        </BtnArea>
        )
    }else{
        if(User.userData && User.userData.isAdmin){
            return(
            <BtnArea>
                <ButtonStyle onClick={adminHandler}>BUY</ButtonStyle>
                <ButtonStyle white onClick={adminHandler}>WISH LIST</ButtonStyle>
            </BtnArea>
            )
        }else{
            return(
            <BtnArea>
                <Payment detail={PaymentInfo} onSuccess={transactionSuccess}>BUY</Payment>
                <ButtonStyle white onClick={cartHandler} >WISH LIST</ButtonStyle>
            </BtnArea>
            )
        }
    }
}

export default withRouter(PayCart);
