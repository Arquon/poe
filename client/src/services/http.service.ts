import axios from "axios";
import configFile from "@@/config/config.json";

const httpService = axios.create({
   baseURL: configFile.BASE_URL,
});

export default httpService;
