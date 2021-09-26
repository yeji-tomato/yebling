import axios from 'axios'

let corsUrl = process.env.NODE_ENV === 'production' ? 'https://yebling.netlify.app' : 'http://localhost:3000'

axios.defaults.baseURL = corsUrl; //서버주소
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = corsUrl;

export let url = process.env.NODE_ENV === 'production' ? 
axios.create({
    baseURL: "https://yebling.herokuapp.com",
  })
  : axios