import dotenv from 'dotenv';

const ENV = process.env.NODE_ENV;
dotenv.config({
  path: `./.env.${ENV}`,
});
