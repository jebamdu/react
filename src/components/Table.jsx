import { Link } from 'react-router-dom';
import './table.css'
const Table = ({ data }) => {
    let d = []; //["id:1","time","updateAt"]
    for (let a in data[0]) {
        d.push(a)
    }
    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        {
                            d.map((e, i) => <th key={i}>{e}</th>)
                        }
                    </tr>
                </thead>
                <tbody>
                    {data.map((e, i) => { //{id:1,timr:10,upadte:"2022r-- pls clarify me da pls give me 600 rs just for fun pls wait sure da"}
                        return <tr key={i}>
                            {d.map((a, i) => <td key={i}>{
                                a === 'id' ? <Link to={String(e[a])} >{e[a]}</Link> : e[a]}</td>)}
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Table;