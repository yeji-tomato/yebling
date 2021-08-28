import MenuBar from "../components/MenuBar";
import Bottom from "../components/Bottom";
import Inner from '../components/Inner';
import { withRouter } from "react-router-dom";

function Upload() {
    return (
        <div>
            <MenuBar/>
            <Inner>
                관리자 업로드
            </Inner>
            <Bottom />
        </div>
    )
}

export default withRouter(Upload);