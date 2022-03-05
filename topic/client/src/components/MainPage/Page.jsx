import { useContext } from 'react'
import Login from "./auth/Login"
import Register from "./auth/Register"
import Topics from "./topics/Topics"
import EditTopic from "./topics/EditTopic"
import NotFound from "./utils/NotFound"
import { Routes, Route } from "react-router-dom";
import CreateTopic from './topics/CreateTopic'
import BarChart from "./topics/BarChart"
import { GlobalState } from '../../GlobalState'
const Page = () => {
    const state = useContext(GlobalState)
    const [isLogged] = state.UserApi.isLogged;
    return (
        <Routes>
            <Route path="/" element={<BarChart /> } />
            <Route path="/topics" element={<Topics />} />
            <Route path="/create" element={isLogged ? <CreateTopic /> : <NotFound />} />
            <Route path="/topics/edit/:id" element={isLogged ? <EditTopic /> : <NotFound />} />
            <Route path="/login" element={isLogged ? <NotFound /> : <Login />} />
            <Route path="/register" element={isLogged ? <NotFound /> : <Register />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default Page
