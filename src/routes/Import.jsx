import { useEffect, useState } from "react";
import axios from "../instance/axios";

const Import = () => {

  const [data, setdata] = useState([]);
  const add = async (e) => {
    const val = await importCSV(e);
    // alert("import sucessfully", val.toString());
    setdata(val)
  };

  const [value, setvalue] = useState([]);
  const [drop, setdrop] = useState([]);

const batch=async()=>{
  const val=await axios.get("/showbatches")
  setdrop(val.data)

}



useEffect(() => {
  batch()
}, []);

const inputele=async(e)=>{
  e.preventDefault()
  console.log(data);
 
  const sucess=await axios.post("/inputele",{
    
      batch_id:value.batch_id,
      data:data
    
  })
  
  console.log("the sucess",sucess);
}




  //   return <button onClick={add}>ADD</button>;
  return (
    <>
    <form onSubmit={inputele} >
    <label>Select the Batch:</label>

        <select
          value={value.batch_id}
          required
          onChange={(e) =>
            setvalue((p) => ({ ...p, batch_id: e.target.value }))
          }
        >
          <option hidden value={""}>
            Please select
          </option>
          {drop.map((e) => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
    
   
    <br />

    <input type="file" accept="text/csv" onChange={add} />

    <button type="submit">Submit</button>

    </form>
    </>
  )
};

export default Import;

function importCSV(e) {
  return new Promise((resolve, reject) => {
    let list = [];
    var fr = new FileReader();
    fr.onload = function () {
      // console.log(fr.result);
      let headContainer = [];
      fr.result.split("\n").forEach((l, i) => {
        if (i == 0) {
          headContainer = l.split(",").map(h=>h.trim());
          return;
        }
        let obj = {};
        let row = l.split(",");
        if (row.length === 1 && headContainer.length > 1) return;
        row.forEach((w, i) => {
          obj[headContainer[i]] = w.trim();
        });
        list.push(obj);
      });
      // console.log(list);
      // return list;
      resolve(list);
      // importPage(list)
    };
    try {
      fr.readAsText(e.target.files[0]);
    } catch (e) {
      console.error(e);
      reject("Can't read data from the file");
    }
    //   importFile.value = "";
  });
  // return promData
}

// const Import = () => {
//   const add = (e) => {
//     const val = importCSV(e);
//     alert("import sucessfully", val);
//     // console.log(val);
//   };
//   //   return <button onClick={add}>ADD</button>;
//   return <input type="file" accept="text/csv" onChange={add} />;
// };

// export default Import;

// function importCSV(e) {
//   let list = [];
//   var fr = new FileReader();
//   //   fr.onload =
//   function run() {
//     console.log(fr.result);
//     fr.result.split("\n").forEach((l, i) => {
//       if (i == 0) return;
//       let obj = {};
//       l.split(",").forEach((w, i) => {
//         switch (i) {
//           case 0:
//             obj.phno = w;
//             break;
//           case 1:
//             obj.name = w;
//             break;
//           case 2:
//             obj.ncs = w;
//             break;
//         }
//       });
//       list.push(obj);
//       //   console.log(list);
//     });
//     // console.log(list);
//     return list;
//     // importPage(list)
//   }

//   fr.readAsText(e.target.files[0]);
//   return run();
//   //   importFile.value = "";
// }
