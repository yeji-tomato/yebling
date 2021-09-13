import React, { useState } from 'react'
import { Checkbox } from 'antd';

function ShopCheck(props) {

  const [CheckList, setCheckList] = useState([])

    const onChangeEach = (e, value) => {
      // 체크할 시 CheckList에 값 넣기
      if (e.target.checked) {
          setCheckList([...CheckList, value]);
          props.handleFilters([...CheckList, value])
      // 체크 해제할 시 CheckList에서 해당 값이 `아닌` 값만 배열에 넣기
      } else {
          setCheckList(CheckList.filter((checked) => checked !== value));
          props.handleFilters(CheckList.filter((checked) => checked !== value))
      }
    }

    return (
        <>
          {props.list && props.list.map((value, index) => (
          <div key={index} style={{padding: '10px'}}>
           <Checkbox onChange={(e) => onChangeEach(e, value)} checked={CheckList.includes(value)} />
            &nbsp;<span>{value}</span>&nbsp;
          </div>
        ))}
        </>
    )
}

export default ShopCheck
