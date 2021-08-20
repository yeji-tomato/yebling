import { useEffect } from 'react' 
import axios from 'axios'

export default function Home(){
    useEffect(() => {
        axios.get('/api/hello')
        .then(response => console.log(response))
    }, [])

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
}