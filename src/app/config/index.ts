import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  BYCRYPT_SALT_ROUND: process.env.BYCRYPT_SALT_ROUND,
  access_token: process.env.ACESS_SECRET,
  NODE_ENV: process.env.NODE_ENV
};
