import { Link } from "react-router-dom";
import "./table.css";

const Table = ({ data, emailFn }) => {
 
  let d = []; //["name","email_id","Basic","attempt(B)","Intermediate","attempt(I)"]
  for (let a in data[0]) {
    d.push(a);
  }
  function getString(a, e) {
    if (a === "id") return <Link to={String(e[a])}>{e[a]}</Link>;
    else if (a === "email_id")
      return <span onClick={() => emailFn(e[a])}>{e[a]}</span>;
    else return e[a];
  }
  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {d.map((e, i) => (
              <th key={i}>{e}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((e, i) => {
            return (
              <tr key={i}>
                {d.map((a, i) => (
                  <td key={i}>{getString(a, e)}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
