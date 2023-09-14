import * as dotenv from 'dotenv';
import { join } from 'path';

const env = process.env.NODE_ENV;

if (!env) {
  throw 'NODE_ENV not present';
}

dotenv.config({
  path: join(__dirname, `../.env.${env}`),
});

const envs = {
  NODE_ENV: process.env.NODE_ENV,
  PROJECT_CODE: process.env.PROJECT_CODE,
};

export const config = {
  app: {
    env: envs.NODE_ENV,
    name: envs.PROJECT_CODE,
  },
};
