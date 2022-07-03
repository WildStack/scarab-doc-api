declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string | 'development' | 'production';
      PORT: string;
      NODE_ENV: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
    }
  }
}
