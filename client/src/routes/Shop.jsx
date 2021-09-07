import MenuBar from "../components/MenuBar";
import Bottom from "../components/Bottom";
import LeftSider from "../components/LeftSider";
import Center from "../components/Center"
import { Layout, Input, Breadcrumb } from 'antd';
import ShopMenu from "../components/ShopMenu";

const { Content } = Layout;
const { Search } = Input;

export default function Shop(){

    const onSearch = value => console.log(value);
    
    return (
        <>
            <MenuBar/>
            <Content style={{ padding: '30px' }}>
            <Breadcrumb style={{ margin: '16px 0', textAlign: 'end' }}>
                <Search placeholder="Search" allowClear onSearch={onSearch} style={{ width: 200 }} />
            </Breadcrumb>
            
                <Layout style={{ height: 700 }}>
                    <LeftSider width={250}>
                        <ShopMenu/>
                    </LeftSider>
                    <Center>Content</Center>
                </Layout>
            </Content>
            <Bottom />
        </>
    )
}