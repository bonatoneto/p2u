import axios from "axios";
import { parseCookies } from "nookies";

const { 'p2u-token': token } = parseCookies();

const api = axios.create({
  baseURL: "https://api.processtouse.com",
})

if (token) {
  api.defaults.headers['Authorization'] = `Bearer ${token}`;
}
   
export default api;