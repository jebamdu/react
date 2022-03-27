import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../instance/axios";
import './questions.css'

const Question = () => {
    const catid = useParams().catID
    const navigate = useNavigate()
    const [questions, setQuestions] = useState([{ id: 1, qus: "", ans: "", options: [] }]);
    const addQues = () => {
        setQuestions(p => [...p, { id: p.length + 1, qus: "", ans: "", options: [] }])
    }
    const submit = async e => {
        e.preventDefault();
        console.log(questions);
        const da = {
            type_id: catid,
            qus: questions.map(d => d.qus),
            ans: questions.map(d => [d.options.at(d.ans), ...d.options.filter((f, i) => i != d.ans)]),
        }

        console.log(da);
        const res = await axios.post('/insqus', da)
        if (res.data.status)
            navigate('/')
        else alert('something went wrong')
    }
    return (
        <div>
            CreateQuestion
            <form onSubmit={submit}>
                {questions.map((q, i) => <QuestionTemplate setQuestions={setQuestions} num={i + 1} key={i} qus={q} />)}
                <div className="controls">
                    <button type="button" onClick={addQues}>+ Add</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </div>

    );
}

const QuestionTemplate = ({ num = "", qus = {}, setQuestions, user }) => {
    const updateValue = (val, field) => setQuestions(p => p.map(q => {
        if (q.id === qus.id) {
            if (user) {
                q.user_ans = val
                return q
            }
            if (typeof field === "number") {
                q.options[field] = val;
                return q
            }
            q[field] = val;
            return q;
        }
        return q
    }))
    return <div className="question">
        <label>Question {num}</label>
        <textarea className="qus_text" type="text" value={qus.qus} disabled={user} onChange={e => updateValue(e.target.value, "qus")} ></textarea>
        {Array.apply(null, Array(4)).map((q, i) => <div key={i} className="qus_option">
            <input type="radio" checked={(user ? qus.user_ans : qus.ans) === i} required onChange={e => updateValue(i, "ans")} />
            <input type="text" disabled={user} value={qus.options[i]} onChange={e => updateValue(e.target.value, i)} />
        </div>)}
    </div>
}

export { QuestionTemplate };
export default Question;