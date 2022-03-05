import { createContext,useState,useEffect } from 'react'
import UserApi from "./api/UserApi"
import TopicApi from './api/TopicApi';
import axios from "axios"
export const GlobalState = createContext();
export const DataProvider = ({ children }) => {
    const [token,setToken]=useState(false)
    useEffect(() => {
        const refreshToken=async () => {
            const res=await axios.get("/user/refresh_token");
            setToken(res.data.accesstoken)
        }
        const login=localStorage.getItem("Login");
        if(login){
            refreshToken();
        }
    },[])
    const state={
        token:token,
        UserApi:UserApi(token),
        TopicApi:TopicApi(token)
    }
    return <GlobalState.Provider value={state}>
        {children}
    </GlobalState.Provider>
}
