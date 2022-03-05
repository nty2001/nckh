import { useState, useEffect } from 'react'
import axios from "axios"
const TopicApi = (token) => {
    const [topics, setTopics] = useState([])
    const [callback, setCallback] = useState(false)
    useEffect(() => {
        if (token) {
            const getTopics = async () => {
                try {
                    const res = await axios.get("/topic", {
                        headers: { Authorization: token }
                    })
                    setTopics(res.data)
                } catch (error) {
                    alert(error.message.data.msg)
                }
            }
            getTopics()
        }else{
            const getTopics = async () => {
                try {
                    const res = await axios.get("/topic/all", {
                        headers: { Authorization: token }
                    })
                    setTopics(res.data)
                } catch (error) {
                    alert(error.message.data.msg)
                }
            }
            getTopics()
        }
    }, [token, callback])
    return {
        topics: [topics, setTopics],
        callback: [callback, setCallback]
    }
}

export default TopicApi
