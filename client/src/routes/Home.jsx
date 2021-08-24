import MenuBar from "../components/MenuBar";
import Bottom from "../components/Bottom";
import styled from "styled-components";
import { SwapRightOutlined } from '@ant-design/icons';
import path from '../image/mainPhoto.jpg';
import { Link } from 'react-router-dom';
import Inner from '../components/Inner';

export default function Home(){

    const Content =  styled.div`
        width: 100%;
        height: 100%;
        display : flex;
        justify-content: center;
        flex-wrap : wrap;
        position: relative;
        align-items: center;
        @media only screen and (max-width: 576px) {
            flex-direction: column;
            // text-align: center;
        }
    `

    const Vertical = styled.div`
        position: absolute;
        top: 30%;
        left: 15%;
        z-index: 1;
        @media only screen and (max-width: 576px) {
           position: relative;
            top: 0;
            left: 0;
        }
        @media only screen and (min-height: 1366px) {
            top: 10%;
            left: 20%;
        }
    `
    
    const FindText = styled.p`
        text-align: right;
        font-size: 50px;
        @media only screen and (max-width: 576px) {
            font-size: 30px;
            text-align: center;
        }
    `
    const ShopNow =  styled.div`
        text-align: left;
        font-size: 15px;
        line-height: 28px;
        border-bottom: 1px solid #000;
        a{
            color: #000;
        }
        &:hover{
            a{
                color: #7B2A2A;
            }
            border-bottom: 1px solid #7B2A2A;
            transform: translateX(3em);
            transition: transform 250ms ease-in-out;
        }
    `

    const ImageStyle = styled.img`
        width: 400px;
        margin: 55px;
        @media only screen and (max-width: 576px) {
            width: 50vw;
            margin: 2vw;
        }
    `

    const Text = styled.p`
        position: absolute;
        bottom: 10%;
        right: 23%;
        font-size: 15px;
        color: #9A9A9A;
        z-index: 1;
        @media only screen and (max-width: 576px) {
            position: relative;
            right: 0;
            bottom: 0;
            font-size: 12px;
        }
        @media only screen and (min-height: 1366px) {
            bottom: 20%;
        }
    `

    return (
        <>
            <MenuBar/>
                <Inner>
                    <Content>
                    <Vertical >
                        <FindText>
                            Find your beauty <br />
                            from yebling.
                        </FindText>
                        <ShopNow>
                        <Link to="/shop">
                            SHOP NOW &nbsp;
                            <SwapRightOutlined style={{fontSize: '20px'}}/>
                        </Link>
                        </ShopNow>
                    </Vertical>
                    <ImageStyle
                        src={path}
                    />
                    <Text>
                    There are four types of <br />
                    Yebling, <br />
                    including necklaces, rings, <br />
                    earrings, and bracelet.
                    </Text>
                    </Content>
                </Inner>
            <Bottom />
        </>
    )
}