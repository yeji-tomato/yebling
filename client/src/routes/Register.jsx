import { DatePicker } from 'antd';

export default function Register(){
    return (
        <div>
            <form action="">
                <label>ID</label>
                <input type="text" value onChange/>
                <label>PASSWORD</label>
                <input type="password" value onChange/>
                <label>PASSWORD CONFIRM</label>
                <input type="password" value onChange/>
                <label>NAME</label>
                <input type="text" value onChange/>
                <label>BIRTH</label>
                {/* <input type="date"/> */}
                <DatePicker />
                <label>GENDER</label>
                <input type="radio" value="MAN"/>
                <input type="radio" value="WOMAN" checked/>
                <label>EMAIL</label>
                <input type="email" value onChange/>
                <label>PHONE</label>
                <input type="tel" />
                <br />
                <button>
                    SIGN UP
                </button>
            </form>
        </div>
    )
}