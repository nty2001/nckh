import { useState } from 'react'
import {Link} from "react-router-dom"
import axios from "axios"
const Login = () => {
    const data = {
        email: "",
        password: ""
    }
    const [user, setUser] = useState(data)
    const inputOnchange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }
    const loginSubmit = async(e) => {
        e.preventDefault();
        try {
            await axios.post("/user/login", {...user})
            localStorage.setItem("Login", true)
            window.location.href = "/"
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    return (
        <div className="user">
            <form onSubmit={loginSubmit}>
                <h2>Login</h2>
                <input type="email" name="email" placeholder="Email" value={user.email} onChange={inputOnchange} />
                <input type="password" name="password" placeholder="Password" value={user.password} onChange={inputOnchange} />
                <div className="user__btn">
                    <button>Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    )
}

export default Login