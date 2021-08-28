import MenuBar from "../components/MenuBar";
import Bottom from "../components/Bottom";
import Inner from '../components/Inner';

function Cart() {
    return (
        <div>
            <MenuBar/>
            <Inner>
                장바구니
            </Inner>
            <Bottom />
        </div>
    )
}

export default Cart;