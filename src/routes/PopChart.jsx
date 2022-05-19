import axios from "../instance/axios";
import "./PopChart.css";
import { useEffect, useRef, useState } from "react";
import Linechart from "./Linechart";

const PopChart = ({
  email = "",
  hidder = () => {},
  currentLevel: { current: levelId = "" },
}) => {
  const [chartlist, setchartlist] = useState({ name: [] });
  const [dis, setDis] = useState(false);
  const [backDis, setBackDis] = useState(true);
  // const [data, setdata] = useState([]);
  const [finaldata, setfinaldata] = useState({ labels: [], datasets: [] });
  // const [next, setnext] = useState(0);
  const next = useRef(0);
  console.log(levelId, email);

  const workflow = (name, data) => {
    console.log(name, "nameis");
    console.log(data, "data");
    console.log(chartlist.name.length);
    console.log(next.current);
    

    setfinaldata({
      
      labels: data.map((data) => data.date),
      datasets: [
        {
          label: name,
          data: data.map((data) => data.mark),
          bagroundColor:["#f1f1f1","#FF0000","	#FF00FF","#FFA500","#7FFF00","#8A2BE2","#FFC0CB"],
          borderColor:"black",
          borderWidth:1,
        },
      ],
    });
  };
  // const dummyData = {
  //   labels
  // };
  // useEffect(() => {
  //   showgraph(chartlist);
  // }, [next]);
  const showgraph = (chartLI) => {
    // setname(chartlist.name[next])
    // setdata(chartlist.arrayvalues[next])
    // setname(chartLI.name[next]);
    // setdata(chartLI.arrayvalues[next]);

    
    // setnext((p) => p + 1);
    workflow(chartLI.name[next.current], chartLI.arrayvalues[next.current]);
  };

  const showchart = async () => {
    const chart = await axios.get("/showchart", {
      params: { id: levelId, email_id: email },
    });
    console.log(chart.data);
    setchartlist(chart.data);
    showgraph(chart.data);
  };
  console.log(chartlist, "data");

  useEffect(() => {
    showchart();
  }, []);
  return (
    <div
      className="popChartContainer"
      onClick={(e) => {
        e.preventDefault();
        if (e.currentTarget === e.target) {
          hidder(false);
        }
      }}
    >
      <div className="popChart">
        {<Linechart enddata={finaldata} />}

        <div className="row">
          <button
            disabled={backDis}
            className="btn primary"
            onClick={() => {
              next.current--;
              if (chartlist.name.length >= next.current) setDis(false);
              if (next.current === 0) setBackDis(true);
              showgraph(chartlist);
            }}
          >
            {"<"}
          </button>
          <button
            disabled={dis}
            className="btn primary"
            onClick={() => {
              next.current++;
              if (chartlist.name.length-1 <= next.current) setDis(true);
              if (next.current >= 0) setBackDis(false);

              showgraph(chartlist);
            }}
          >
            {">"}
          </button>
        </div>
        {/* <Line data={{labels:["2001","2202","2005"],datasets:[{label:"2001",data:["2202","153","4564"]}]}} /> */}
      </div>
    </div>
  );
};

export default PopChart;
