import axios from "axios";
import { BASE_URL } from "@@/config/config.json";

const httpService = axios.create({
   baseURL: BASE_URL,
   withCredentials: true,
});

export default httpService;
