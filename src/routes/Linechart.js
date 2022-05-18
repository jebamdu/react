import React from "react";

import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function Linechart({ enddata }) {
  console.log(enddata);
  return <Line data={enddata} />;
}
export default Linechart;
