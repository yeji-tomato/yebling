import { url } from '../utils/axios'
// import axios from 'axios'
import { PRODUCT_SERVER } from './config'
import {
    IMAGE_PRODUCT,
    UPLOAD_PRODUCT,
    GOODS_PRODUCT,
}   from './types';

// let corsUrl = process.env.NODE_ENV === 'production' ? 'https://yebling.netlify.app' : 'http://localhost:3000'

// axios.defaults.baseURL = corsUrl; //서버주소
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = corsUrl;

export function imageProduct(dataToSubmit){

    const request = url.post(`${PRODUCT_SERVER}/image`, dataToSubmit)
        .then(response => response.data )
    return {
        type: IMAGE_PRODUCT,
        payload: request
    }
}

export function uploadProduct(dataToSubmit){

    const request = url.post(`${PRODUCT_SERVER}/upload`, dataToSubmit)
        .then(response => response.data )
    return {
        type: UPLOAD_PRODUCT,
        payload: request
    }
}

export function goodsProduct(dataToSubmit){

    const request = url.post(`${PRODUCT_SERVER}/goods`, dataToSubmit)
        .then(response => response.data )
    return {
        type: GOODS_PRODUCT,
        payload: request
    }
}



