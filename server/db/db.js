// eslint-disable-next-line no-unused-vars
import { Pool, Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = {
  query: (text, params) => pool.query(text, params),
};
export default db;
