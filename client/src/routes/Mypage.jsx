import React, { useState, useEffect } from 'react'
import MenuBar from "../components/MenuBar";
import Bottom from "../components/Bottom";
import UserInfo from '../components/UserInfo';
import PayInfo from '../components/PayInfo';
import { Result, Tabs } from 'antd';
import { withRouter } from "react-router-dom";
import { SmileOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import styled from 'styled-components';

const { TabPane } = Tabs;
const MPdiv = styled.div`
    min-height: 80vh;
    padding: 50px;
`

function Mypage() {

    const user = useSelector(state => state.user);
    const [name, setname] = useState('')
    const [Info, setInfo] = useState();
    

    useEffect(() => {
        if(user.userData){
            setname(user.userData.name)
            setInfo(user.userData)
        }
    }, [user.userData])

    return (
        <div>
            <MenuBar/>
            <MPdiv>
                <Tabs tabPosition='top'>
                    <TabPane tab="MYPAGE" key="1">
                        <br/><br/><br/>
                    <Result
                            icon={<SmileOutlined />}
                            title={`${name}님 환영합니다!`}
                        />
                    </TabPane>
                    <TabPane tab="회원정보 수정" key="2">
                        <UserInfo details={Info}/>
                    </TabPane>
                    <TabPane tab="결제 내역" key="3">
                        <PayInfo/>
                    </TabPane>
                </Tabs>
            </MPdiv>
            <Bottom />
        </div>
    )
}

export default withRouter(Mypage);