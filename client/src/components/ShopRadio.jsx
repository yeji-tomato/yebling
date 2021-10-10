import React, { useState } from 'react'
import { Radio, Space } from 'antd';

function ShopRadio(props) {

    const [radioState, setRadioState] = useState('Any');
    const radioOnChange = e => {
      setRadioState(e.target.value)
      props.handleFilters(e.target.value)
    };

    return (
        <div>
              <Radio.Group onChange={radioOnChange} 
              buttonStyle={'outline'}
              defaultValue={radioState}
            >
            <Space direction="vertical"
              style={{padding: '10px'}}>
            {props.list && props.list.map((value, index) => (
              <Radio key={index} value={value.name}>{value.name}</Radio>
              ))}
            </Space>
            </Radio.Group>
        </div>
    )
}

export default ShopRadio
