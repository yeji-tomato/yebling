import axios from 'axios'

// export let url = process.env.NODE_ENV === 'production' ? 
// axios.create({
//     baseURL: "https://yebling.herokuapp.com",
//     withCredentials: true,
//     headers: {
//       'Access-Control-Allow-Origin' : 'https://yebling.herokuapp.com',
//       'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//       }
//   })
//   : axios

export let url = process.env.NODE_ENV === 'production' ? 
axios.create({
    baseURL: "https://yebling.herokuapp.com",
    withCredentials: true,
  })
  : axios
