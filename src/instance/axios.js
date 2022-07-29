import axios from "axios";

export default axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:5000/" : "https://40wdfjlbtf.execute-api.ap-south-1.amazonaws.com/",
});
