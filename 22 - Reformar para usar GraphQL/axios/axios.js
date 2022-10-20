import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: { crossDomain: true, 'Content-Type': 'application/json' },
});

instance.defaults.withCredentials = true

export default instance;
