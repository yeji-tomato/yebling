import { Menu, Checkbox, Radio, Space } from 'antd';
import { useState } from "react";
import styled from 'styled-components'

export default function ShopMenu(){
    const { SubMenu } = Menu;
    // submenu keys of first level
    // const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

//     const Sider = () => {
//     const [openKeys, setOpenKeys] = useState(['sub1']);

//     const onOpenChange = keys => {
//         const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
//         if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
//         setOpenKeys(keys);
//         } else {
//         setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
//         }
//     };
// }   
  const CheckboxGroup = Checkbox.Group;

  const plainOptions = ['NECKLACE', 'EARRINGS', 'RING', 'BRACELET'];
  const defaultCheckedList = [];

  const [checkedList, setCheckedList] = useState(defaultCheckedList);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const radioDefault =  'ANY';


  const [radioState, setRadioState] = useState(radioDefault);

  const onChange = list => {
    setCheckedList(list);
    setIndeterminate(!!list.length && list.length < plainOptions.length);
    setCheckAll(list.length === plainOptions.length);
  };

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  const radioOnChange = e => {
    console.log('radio checked : ', e.target.value);
    // console.log(radioState)
    setRadioState({
      radioState: e.target.value,
    });
    // console.log(radioState)
  };

  const CheckGroup = styled(CheckboxGroup)`
  .ant-checkbox-group-item {
    display: flex;
    flex-direction: row;
    padding: 10px 20px;
  }
  `

    return (
      <>
        <Menu mode="inline" style={{ width: 250 }}>
          {/* Jewerly */}
          <SubMenu key="Jewerly"  title="Jewerly">
          <div style={{padding: '10px'}}>
          <Checkbox indeterminate={indeterminate} onChange={onCheckAllChange} checked={checkAll}>
            Check all
          </Checkbox>
          </div>
          <CheckGroup options={plainOptions} value={checkedList} onChange={onChange} />
          </SubMenu>

          {/* Price */}
          <SubMenu key="Price"  title="Price">
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
          </SubMenu>
        </Menu>
        </>
    )
    
}