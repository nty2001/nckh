import { GlobalState } from '../../../GlobalState'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
const Topics = () => {
    const state = useContext(GlobalState)
    console.log("🚀 ~ file: Topics.jsx ~ line 7 ~ Topics ~ state", state)
    const [topics] = state.TopicApi.topics;
    const [callback,setCallback] = state.TopicApi.callback;
    const token =state.token
    const deleteTopic = async(id) => {
        try {
            await axios.delete(`/topic/${id}`, {
                headers: { Authorization: token }
            })
            setCallback(!callback)
        } catch (error) {
            window.location.href = "/"
        }
    }
    return (
        <div className="topics">
            {topics.map(topic => (
                <div className="topic__item" key={topic._id}>
                    <h4>{topic.name}</h4>
                    <div className="topic__content">
                        <p>{topic.post}</p>
                    </div>
                    <div className="topic__edit">
                        <Link to={`edit/${topic._id}`}>Edit</Link>
                    </div>
                    <div className="topic__delete" onClick={() => deleteTopic(topic._id)}>
                        X
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Topics
