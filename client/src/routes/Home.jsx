import MenuBar from "../components/MenuBar";
import Bottom from "../components/Bottom";
import { Layout } from 'antd';

export default function Home(){
    const { Content } = Layout;
    return (
        <div>
            <MenuBar/>
            <Content>Home</Content>
            <Bottom />
        </div>
    )
}