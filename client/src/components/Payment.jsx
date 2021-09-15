import React, { useEffect } from 'react'
import ButtonStyle from './ButtonStyle';
import { useSelector } from "react-redux";
import {message} from 'antd'

function Payment(props) {

    const user = useSelector(state => state.user)

    const userData = user.userData;
    const product = props.detail;

    console.log('userData', userData)
    console.log('product', product)

    useEffect(() => {
        const jquery = document.createElement('script')
        jquery.src = "https://code.jquery.com/jquery-1.12.4.min.js"
        const iamport = document.createElement("script")
        iamport.src = "https://cdn.iamport.kr/js/iamport.payment-1.1.8.js"
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        }
    }, [])

    const onClickPayment = () => {

        var IMP = window.IMP; // 생략가능
		IMP.init('imp85155473');

        // 결제 데이터 정의
        const data = {
            pg: 'html5_inicis',   // PG사 
            pay_method: 'card',                           // 결제수단
            merchant_uid: `mid_${new Date().getTime()}`,   // 주문번호
            // amount: product.amount,                        // 결제금액
            amount: 1,                        // 결제금액
            name: product.title,                            // 주문명
            buyer_name: userData.name,                      // 구매자 이름
            buyer_tel: userData.name,                     // 구매자 전화번호
            buyer_email: userData.email               // 구매자 이메일
          }
          
          IMP.request_pay(data, callback);

    }

    const callback = (response) => {
        const {success, error_msg} = response;

        if(success){
            message.success('결제를 성공하였습니다!😆');
        }else{
            message.warning(`결제실패 : ${error_msg}`);
        }
    }


    return (
        <div>
            <ButtonStyle onClick={onClickPayment}>BUY</ButtonStyle>
        </div>
    )
}

export default Payment



