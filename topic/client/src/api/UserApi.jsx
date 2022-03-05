import {useState,useEffect} from 'react'

const UserApi = (token) => {
    const [isLogged,setIsLogin]=useState(false)
    useEffect(()=>{
        if(token){
            const getUser=async()=>{
                try {
                    setIsLogin(true)
                } catch (error) {
                    alert(error.message.data.msg)
                }
            }
            getUser()
        }
    },[token])
    return {
        isLogged:[isLogged,setIsLogin]
    }
}

export default UserApi
