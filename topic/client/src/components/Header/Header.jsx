import { useContext, useState } from 'react'
import { GlobalState } from '../../GlobalState'
import Menu from "./icon/menu.svg"
import Close from "./icon/close.svg"
import { Link } from "react-router-dom"
import axios from "axios"
const Header = () => {
    const state = useContext(GlobalState)
    const [menu, setMenu] = useState(false)
    const [isLogged] = state.UserApi.isLogged;
    const styleMenu = {
        left: menu ? "0" : "-100%"
    }
    const loggerRoute = () => {
        return (
            <>
                <li>
                    <Link to="/topics">Topics</Link>
                </li>
                <li>
                    <Link to="/create">Create</Link>
                </li>
                <li>
                    <Link to="/" onClick={logout}>Logout</Link>
                </li>
            </>

        )
    }
    const logout = async() => {
        window.localStorage.clear();
        window.location = "/"
        await axios.get("/user/logout")
    }
    return (
        <div className="header">
            <div className="menu">
                <img src={Menu} alt="" onClick={() => setMenu(!menu)} />
            </div>
            <div className="logo">
                <h1>
                    <Link to="/">Topics</Link>
                </h1>
            </div>
            <ul style={styleMenu}>
                {isLogged ? loggerRoute() :
                    <li>
                        <Link to="/login">Login & Register</Link>
                    </li>
                }

                <li>
                    <img src={Close} alt="" className="menu" onClick={() => setMenu(!menu)} />
                </li>
            </ul>
        </div>
    )
}

export default Header
