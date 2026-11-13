import 'dotenv/config';
import { z } from 'zod';

const schema = z.object({
  DB_HOST: z.string().min(1).default('localhost'),
  DB_PORT: z.coerce.number().int().positive().default(3306),
  DB_USER: z.string().min(1).default('root'),
  DB_PASSWORD: z.string().default(''),
  DB_NAME: z.string().regex(/^[a-zA-Z0-9_]+$/).default('movie_tracker'),
  PORT: z.coerce.number().int().positive().default(3000),
});

export const env = schema.parse(process.env);
