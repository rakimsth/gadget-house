import axios from "axios";
import { BASE_URL } from "../constants";

const instance = axios.create({
  baseURL: BASE_URL,
});

instance.defaults.headers.common["Authorization"] = JSON.parse(
  localStorage.getItem("user")
)?.token
  ? `Bearer ${JSON.parse(localStorage.getItem("user"))?.token}`
  : null;

export default instance;
