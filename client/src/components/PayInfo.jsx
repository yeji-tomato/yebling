import React, { useEffect, useState } from 'react'
import { List } from 'antd';
import { useSelector } from "react-redux";

function PayInfo() {

    const user = useSelector(state => state.user)
    const [Data, setData] = useState([])
    const [len, setlen] = useState(0)
    
    useEffect(() => {
        if(user.userData && user.userData.history){
            let listData = []
            user.userData.history.forEach(item => {
                listData.push(item)
            })
            setData(listData)
            setlen(user.userData.history.length)
        }
    }, [user.userData])

    let src = process.env.NODE_ENV === 'production' ? `https://yebling.herokuapp.com/` : `http://localhost:5000/`
    console.log(Data, 'Data')

    return (
        <div>
            <List
            itemLayout="vertical"
            pagination={{
            onChange: page => {
                console.log(page);
            },
            pageSize: len,
            }}
            dataSource={Data}
            renderItem={item => (
            <List.Item
                key={item.name}
                extra={
                <img
                    width={200}
                    alt="logo"
                    src={`${src}${item.image}`}
                />
                }
            >
                <List.Item.Meta
                title={item.name}
                description={item.details}
                />
                {item.jetype} | {item.quantity}개 | {item.dateOfPurchase}
                <p style={{color: '#CB7474'}}>₩ {String(item.price).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}</p>
            </List.Item>
            )}
        />
        </div>
    )
}

export default PayInfo
