import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../instance/axios";

const CreateExam = ({ context = "exam" }) => {
    const [data, setData] = useState("");
    const examid = useParams().levelID
    const navigate = useNavigate()
    const submit = async e => {
        e.preventDefault();
        if (data) {
            const d = await insertData('/insert', context === 'exam' ? { time: data, name: 'null' } : { time: 'null', name: data, id: examid })
            console.log(d);
            navigate(String(d))
        }
    }
    return (
        <form onSubmit={submit}>
            {context === 'exam' ?
                <input className="inputText" value={data} onChange={e => setData(e.target.value)} type="text" placeholder="Time (minutes)" />
                :
                <input className="inputText" value={data} onChange={e => setData(e.target.value)} type="text" placeholder="Catagory Name" />
            }
            <button className="btn">Submit</button>
        </form>
    );
}

const insertData = async (path, data) => {
    const res = await axios.post(path, data)
    return res.data.status
}

export default CreateExam;
