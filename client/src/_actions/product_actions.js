// import { url } from '../utils/axios'
import axios from 'axios'
import { PRODUCT_SERVER } from './config'
import {
    IMAGE_PRODUCT,
    UPLOAD_PRODUCT,
    GOODS_PRODUCT,
}   from './types';


export function imageProduct(dataToSubmit){

    const request = axios.post(`${PRODUCT_SERVER}/image`, dataToSubmit)
        .then(response => response.data )
    return {
        type: IMAGE_PRODUCT,
        payload: request
    }
}

export function uploadProduct(dataToSubmit){

    const request = axios.post(`${PRODUCT_SERVER}/upload`, dataToSubmit)
        .then(response => response.data )
    return {
        type: UPLOAD_PRODUCT,
        payload: request
    }
}

export function goodsProduct(dataToSubmit){

    const request = axios.post(`${PRODUCT_SERVER}/goods`, dataToSubmit)
        .then(response => response.data )
    return {
        type: GOODS_PRODUCT,
        payload: request
    }
}



