import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './drizzle',
  schema: './utils/schema.jsx',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:tFVpzcZPEQ27@ep-odd-shape-a50dwh1h.us-east-2.aws.neon.tech/Budget-Tracker?sslmode=require',
  },
});
