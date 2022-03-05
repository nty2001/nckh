import { useState } from 'react'
import { Link } from "react-router-dom"
import axios from "axios"
const Register = () => {
    const data = {
        name: "",
        email: "",
        password: ""
    }
    const [user, setUser] = useState(data)
    const inputOnchange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }
    const registerSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/user/register", { ...user })
            localStorage.setItem("Login", true)
            window.location.href = "/"
        } catch (error) {
            alert(error.response.data.msg)
        }
    }
    return (
        <div className="user">
            <form onSubmit={registerSubmit}>
                <h2>Register</h2>
                <input type="name" name="name" placeholder="name" value={user.name} onChange={inputOnchange} />
                <input type="email" name="email" placeholder="Email" value={user.email} onChange={inputOnchange} />
                <input type="password" name="password" placeholder="Password" value={user.password} onChange={inputOnchange} />
                <div className="user__btn">
                    <button>Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
}

export default Register