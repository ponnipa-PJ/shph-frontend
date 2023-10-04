import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8081/api",

  // baseURL : "https://api.shphQueue.ponnipa.in.th/api",
// 
  
  headers: {
    "Content-type": "application/json",
  }
});