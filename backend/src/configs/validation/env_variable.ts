import * as Joi from 'joi';

export const envSchema = Joi.object({
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(3306),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().allow('').required(),
  DB_NAME: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
  ENVIRONMENT: Joi.string()
    .valid('local', 'development', 'staging', 'production')
    .default('development'),
  // PROJECT: Joi.string().required(),
});
