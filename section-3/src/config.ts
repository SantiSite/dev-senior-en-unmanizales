import { registerAs } from '@nestjs/config';
import * as process from 'node:process';

export default registerAs('config', () => ({
  nodeEnv: process.env.NODE_ENV,
  apiKey: process.env.API_KEY,
  database: {
    connectionType: process.env.DATABASE_CONNECTION_TYPE,
    postgresHost: process.env.DATABASE_POSTGRES_HOST,
    postgresPort: parseInt(process.env.DATABASE_POSTGRES_PORT, 10),
    postgresDb: process.env.DATABASE_POSTGRES_DB,
    postgresUser: process.env.DATABASE_POSTGRES_USER,
    postgresPassword: process.env.DATABASE_POSTGRES_PASSWORD,
  },
}));
