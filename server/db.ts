import { Pool } from "pg";
import config from "@/config/database.json";

const { dev } = config;

const pool = new Pool({
   user: dev.user,
   password: dev.password,
   host: dev.host,
   port: dev.port,
   database: dev.database,
});

export default pool;
