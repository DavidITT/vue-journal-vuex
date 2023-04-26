import axios from 'axios'

const authApi =  axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params:{
        key:'AIzaSyCeJA6CNlGKsFByC09uy6X0Z4wOdoGec-8'
    }
})

export default authApi