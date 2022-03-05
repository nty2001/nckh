import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import { useContext } from 'react'
const CreateTopic = () => {
    const data = {
        name: "",
        post: "",
    }

    const inputOnchange = (e) => {
        const { name, value } = e.target;
        setTopic({ ...topic, [name]: value })
    }
    const state = useContext(GlobalState)
    const token = state.token
    const navigate = useNavigate()
    const [callback,setCallback] = state.TopicApi.callback;
    const CreateTopic = async (e) => {
        e.preventDefault();
        try {
            const { name, post } = topic;
             await axios.post("/topic", { name, post },{
                headers: { Authorization: token }
            })
            navigate("/");
            setCallback(!callback)
        } catch (error) {
            window.location.href = "/"
        }
    }
    const [topic, setTopic] = useState(data);
    return (
        <div>
            <div className="create__topic">
                <h2>Create Topic</h2>
                <form onSubmit={CreateTopic}>
                    <label>
                        <p>Name</p>
                        <input type="text" name="name" placeholder="name" value={topic.name} onChange={inputOnchange} />
                    </label>
                    <label>
                        <p>Post</p>
                        <input type="number" name="post" placeholder="post" value={topic.post} onChange={inputOnchange}/>
                    </label>
                    <button>Save</button>
                </form>
            </div>
        </div>
    )
}

export default CreateTopic
