import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

const sql = neon(
  "postgresql://expenses-tracker_owner:Pz9f7kIlGTuq@ep-soft-term-a15g9ken.ap-southeast-1.aws.neon.tech/expenses-tracker?sslmode=require"
);
const db = drizzle(sql, {schema});

export default db;