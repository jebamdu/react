import axios from "axios";

export default axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://kmkahlpccuw4jrd2vvny2kxd740upefw.lambda-url.ap-south-1.on.aws/",
});
