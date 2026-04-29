import axios from "axios";

const API = axios.create({
  baseURL: "https://jobpulse-backend-2.onrender.com/api",
});

export default API;
