import React from 'react'
import styled from 'styled-components';
import { DeleteFilled } from '@ant-design/icons';

const CartTB = styled.table`
    margin: 1em 0;
    width: 100%;
    text-align: center;
    tr{
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        td{
            line-height: 10;
        }
    }
    thead{
        tr{
            font-size: 15px;
            background: #7B2A2A;
            color: #fff;
            td{
                line-height: 5;
            }
        }
    }
`

const Delete = styled(DeleteFilled)`
    font-size: 14px;
    &:hover{
        color: #CB7474;
    }

`

function CartTable(props) {

    // let src = process.env.NODE_ENV === 'production' ? `https://yebling.herokuapp.com/` : `http://localhost:5000/`

    const renderCartImage = (images) => {
        if (images.length > 0) {
            let image = images[0]
            return `https://yebling.herokuapp.com/${image}`
        }
    }

    const renderItems = () => (
        props.products && props.products.map((product, index) => (
            <tr key={index}>
                <td>
                    <img style={{ width: '100px' }} alt="product"
                        src={renderCartImage(product.images)} />
                </td>
                <td>
                    {product.title}
                </td>
                <td>
                    {product.quantity} 개
                </td>
                <td>
                    ₩ {String(product.price).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}
                </td>
                <td>
                    <Delete onClick={() => props.removeItem(product._id)}/>
                </td>
            </tr>
        ))
    )


    return (
        <div>
            <CartTB>
                    <thead>
                        <tr>
                            <td>ITEM</td>
                            <td>NAME</td>
                            <td>QUANTITY</td>
                            <td>PRICE</td>
                            <td>REMOVE</td>
                        </tr>
                    </thead>
                    <tbody>
                        {renderItems()}
                    </tbody>
                </CartTB>
        </div>
    )
}

export default CartTable
