import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../components/Table";
import axios from "../instance/axios";
import CsvDownload from "react-json-to-csv";
import csvDownload from "json-to-csv-export";

import * as XLSX from "xlsx";

import "./notification.css";

const Notification = ({ values }) => {
  const { id } = useParams();

  console.log(values, "values");
  const [table, settable] = useState(null);
  const [exporttable, setexporttable] = useState([]);
  const [improvement, setimprovement] = useState();
  const [exportdata, setexportdata] = useState([]); //[[{qus:"vhvh",ans:"jkjk"}],[],[]]  xlsx=>json =>CSV
  const [pop, setpop] = useState(true);
  const [b_name, setb_name] = useState();
  const tablecall = () => {
    if (values != null) {
      settable(values);
    }
  };
  console.log(id);
  console.log(improvement, "improvementstatus");

  const callexport = async () => {
    const values = await axios.get("/export_batch", {
      params: { batch_id: id },
    });
    console.log(values);
    if (values.data.val != []) {
      setexporttable(values.data.val);
      setimprovement(values.data.status);
      setb_name(values.data.batchname);
    } else {
      alert("You have no Trainee in this batches");
    }
  };

  const filledarray = [];

  const settingarray = (values) => {
    const newarray = [];
    newarray.push(values);
    filledarray.push(newarray);
  };
  const readUploadFile = (e) => {
    e.preventDefault();
    if (e.target.files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "array",cellText:false });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName]
        
       
        const json = XLSX.utils.sheet_to_json(worksheet);
        console.log(worksheet);
        console.log(json);

        json.forEach(settingarray);
        setexportdata(filledarray);
        console.log(filledarray, "array");
      };

      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  const downloadfun = (values, index) => {};

  const dataToConvert = {
    data: exportdata[0],
    filename: 1,
    delimiter: ",",
    headers: Object.keys(exportdata),
  };
  const buttoncall = (values, index) => {};

  const openfun = () => {
    setpop(false);
  };
  return (
    <>
      {/* <div className="navHead">
        <h3>Performance growth</h3>
        </div>
    <div className="notification">
      
      {id ? (
        <>
          {pop && (
            <div
              className=""
              style={{
                position: "fixed",
                zIndex: 500,
                top: 0,
                backgroundColor: "#0008",
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                left: 0,
              }}
            >
              <div
                className="bigcontainer"
                style={{
                  backgroundColor: "white",
                  minHeight: "200px",
                  width: "500px",
                }}
              >
                <div
                  className="smalcontainer"
                  style={{
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    minHeight: "200px",
                  }}
                >
                  Congradulations!! <br/>You have improved this {b_name} with {improvement}
                  <button className="btn primary" onClick={() => openfun()}>
                    ok
                  </button>
                </div>
              </div>
            </div>
          )}
          <div
            className="exports"
            style={{
              overflow: "auto",
              padding: "2rem 1.5rem",
              paddingBottom: "1rem",
              marginRight: "3rem",
            }}
          >
            <button
              className="btn primary"
              style={{
                width: "max-content",
                position: "absolute",
                padding: "10px",
                left: "90%",
                top: "25%",
              }}
              onClick={() => {
                console.log("from export");
                let csv = "";

                //genarate CSV String

                const d = [];
                for (let a in exporttable[0]) {
                  d.push(a);
                  csv += `${a},`;
                }
                csv += "\n";
                exporttable.forEach((v, i) => {
                  d.forEach((h) => (csv += `${v[h]},`));
                  csv += "\n";
                });

                downloadCSV(csv, `report ${b_name},with${improvement}`);

                function downloadCSV(csv, filename) {
                  var csvFile;
                  var downloadLink;

                  //define the file type to text/csv
                  csvFile = new Blob([csv], { type: "text/csv" });
                  downloadLink = document.createElement("a");
                  downloadLink.download = filename;
                  downloadLink.href = window.URL.createObjectURL(csvFile);
                  downloadLink.style.display = "none";

                  document.body.appendChild(downloadLink);
                  downloadLink.click();
                }
              }}
            >
              Export
            </button>
            {<Table data={exporttable} />}
          </div>
        </>
      ) : table ? (
        <>
         
          <div
            className="innercontainer"
            style={{
              height:"100%",
              overflow: "auto",
              padding: "2rem 2rem",
              paddingBottom: "0.5rem",
            }}
          >
            <Table data={table} />
          </div>
        </>
      ) : (
        <div className="showcontainer">
          <p>No batches Ended Now!</p>
        </div>
      )}
    </div>
 */}

      <label class="form-label" for="customFile">
        Default file input example
      </label>
      <input
        type="file"
        class="form-control"
        id="customFile"
        onChange={readUploadFile}
      />

      {exportdata != [] &&
        exportdata.map((i, l) => (
          <div className="container">
            <>
              <CsvDownload data={exportdata[l]} />
              <p>{l}</p>
              <br />
            </>
          </div>
        ))}
    </>
  );
};
export default Notification;
