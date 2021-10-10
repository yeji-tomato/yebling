import MenuBar from "../components/MenuBar";
import Bottom from "../components/Bottom";
// import styled from "styled-components";
import path from '../image/aboutImg.jpg';
import Inner from "../components/Inner";
import styled from 'styled-components'
import { withRouter } from "react-router-dom";

function About(){
    const Content = {
        backgroundImage: `url(${path})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover', 
        height: '79vh'
    }

    const Technology = styled.div`
        border: 1px solid #000;
        padding: 5vw;
        text-align: center;
        h1{
            font-weight: bold;
            font-size: 30px
        }
        ul{
            list-style:none;
            li{
                line-height: 48px;
                text-align: center;
                letter-spacing: 0.5em;
                font-size: 20px;
            }
        }
        @media only screen and (max-width: 576px) {
            h1{
                font-size: 20px;
            }
            ul{
                li{
                    line-height: 30px;
                    font-size: 15px;
                }
            }
        }
    `

    return (
        <>
            <MenuBar/>
            <Inner style={Content}>
                <Technology>
                <h1>Technology used in this project</h1>
                <ul>
                    <li>React</li>
                    <li>Node.js</li>
                    <li>Redux</li>
                    <li>Express js</li>
                    <li>Mongo DB</li>
                </ul>
                </Technology>
            </Inner>
            <Bottom />
        </>
    )
}
export default withRouter(About);