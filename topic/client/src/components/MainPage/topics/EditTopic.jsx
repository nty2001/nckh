import "./createTopic.scss"
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import { useContext } from 'react'
import axios from "axios"
const EditTopic = () => {
    const data = {
        name: "",
        post: "",
        id: ""
    }
    const [topic, setTopic] = useState(data);
    const inputOnchange = (e) => {
        const { name, value } = e.target;
        setTopic({ ...topic, [name]: value })
    }
    const state = useContext(GlobalState)
    const token = state.token
    const params = useParams();
    useEffect(() => {
        const getTopic = async () => {
            if (params.id) {
                const res = await axios.get(`/topic/${params.id}`, {
                    headers: { Authorization: token }
                })
                console.log(res)
                setTopic({
                    _id: res.data._id,
                    name: res.data.name,
                    post: res.data.post,
                })
            }
        }
        getTopic()
    }, [params])

    const [callback, setCallback] = state.TopicApi.callback;
    const navigate = useNavigate()
    const EditTopic = async (e) => {
        e.preventDefault();
        try {
            const { name, post, _id } = topic;
            await axios.put(`/topic/${_id}`, { name, post }, {
                headers: { Authorization: token }
            })
            navigate("/");
            setCallback(!callback)
        } catch (error) {
            window.location.href = "/"
        }
    }

    return (
        <div>
            <div className="create__topic">
                <h2>Create Name</h2>
                <form onSubmit={EditTopic}>
                    <label>
                        <p>Name</p>
                        <input type="text" name="name" placeholder="name" value={topic.name} onChange={inputOnchange} />
                    </label>
                    <label>
                        <p>Post</p>
                        <input type="number" name="post" placeholder="post" value={topic.post} onChange={inputOnchange} />
                    </label>
                    <button>Save</button>
                </form>
            </div>
        </div>
    )
}

export default EditTopic
