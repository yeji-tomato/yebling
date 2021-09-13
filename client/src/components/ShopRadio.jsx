import React, { useState } from 'react'
import { Radio, Space } from 'antd';

function ShopRadio() {
    const radioDefault =  'ANY';
    const [radioState, setRadioState] = useState(radioDefault);
    const radioOnChange = e => {
      console.log('radio checked : ', e.target.value);
      setRadioState({
        radioState: e.target.value,
      });
    };

    return (
        <div>
        <Radio.Group onChange={radioOnChange} 
           buttonStyle={'outline'}
           defaultValue={radioState}
          //  options={['인기순', '최신순']}
          >
          <Space direction="vertical"
           style={{padding: '10px'}}>
            <Radio value='ANY'>ANY</Radio>
            <Radio value='10만원 이하'>10만원 이하</Radio>
            <Radio value='10만원 ~ 20만원'>10만원 ~ 20만원</Radio>
            <Radio value='20만원 이상'>20만원 이상</Radio>
          </Space>
        </Radio.Group>
        </div>
    )
}

export default ShopRadio
