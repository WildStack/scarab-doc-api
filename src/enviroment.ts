import { config } from 'dotenv';

config();

export const environment = {
  PORT: Number(process.env.PORT || 4000),
  NODE_ENV: process.env.NODE_ENV || 'development',
  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_PASSWORD: process.env.REDIS_PASSWORD || 'localhost',
  REDIS_PORT: Number(process.env.REDIS_PORT || 6379),
  redisSingleKey: 'redis-single-key-global',
};
