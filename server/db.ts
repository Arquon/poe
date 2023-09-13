import { Pool } from "pg";
import config from "@/config/database.json";

const isProd = process.env.NODE_ENV === "production";

const { dev, prod } = config;

const { user, password, host, port, database } = isProd ? prod : dev;

const pool = new Pool({
   user: user,
   password: password,
   host: host,
   port: port,
   database: database,
});

export default pool;
