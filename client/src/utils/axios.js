import axios from 'axios'

export let url = process.env.NODE_ENV === 'production' ? 
axios.create({
    baseURL: "https://yebling.herokuapp.com",
    credentials: "include" 
  })
  : axios