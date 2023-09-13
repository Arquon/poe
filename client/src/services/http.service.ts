import axios from "axios";
import configFile from "@@/config/config.json";

const isProd = process.env.NODE_ENV === "production";

const { dev, prod } = configFile;

const baseURL = isProd ? prod.BASE_URL : dev.BASE_URL;

const httpService = axios.create({
   baseURL,
   withCredentials: true,
});

export default httpService;
