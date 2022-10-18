import axios from "axios";

export default axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "https://40wdfjlbtf.execute-api.ap-south-1.amazonaws.com/" : "https://40wdfjlbtf.execute-api.ap-south-1.amazonaws.com/",
});

// http://localhost:5000/