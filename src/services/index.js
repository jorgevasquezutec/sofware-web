import axios from "axios";

const api = axios.create({
  baseURL: "https://chatpoliticos.herokuapp.com/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export default api;